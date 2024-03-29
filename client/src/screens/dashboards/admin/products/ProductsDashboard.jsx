// Dependencies
import { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import {
  FaCheck,
  FaCopy,
  FaDotCircle,
  FaExternalLinkAlt,
  FaGlasses,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Components
import AddProduct from "./AddProduct.jsx";
import ApproveProduct from "./ApproveProduct.jsx";
import EditProduct from "./EditProduct.jsx";
import RemoveProduct from "./RemoveProduct.jsx";
import ProductHistory from "./ProductHistory.jsx";

// Helpers
import convertTime from "helpers/convertTime";

// Actions
import { getAllProducts } from "redux/actions/product";

const ProductsDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("name");

  return (
    <div className="products-dashboard">
      <div className="d-sm-flex justify-content-between mb-3">
        <Button onClick={showAddDialog} className="mb-3 mb-sm-0">
          Add a new product
        </Button>
        <div className="d-flex my-auto">
          <Form.Control
            type="text"
            value={searchValue}
            placeholder="Search for..."
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            style={{ width: "200px", height: "40px" }}
          />
          <Form.Select
            value={searchKey}
            onChange={(e) => setSearchKey(e.currentTarget.value)}
            style={{ width: "100px", height: "40px" }}
          >
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="seller">Seller ID</option>
          </Form.Select>
        </div>
      </div>
      <AddProduct show={addDialog} onHide={hideAddDialog} />
      {products?.length > 0 ? (
        <Table responsive size="sm" className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Product Images</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Keywords</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Count in stock</th>
              <th>Link</th>
              <th>Category</th>
              <th>Pet Type</th>
              <th>Breed Type</th>
              <th>Weight</th>
              <th>Size</th>
              <th>Age Range</th>
              <th>Vegetarian</th>
              <th>Last Edit By</th>
              <th>Date of Approval</th>
              <th>Date of Creation</th>
              <th>Date of Updation</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product[searchKey]?.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((product, index) => (
                <ProductRow key={index} product={product} index={index} />
              ))}
          </tbody>
        </Table>
      ) : (
        <h3>No products found</h3>
      )}
    </div>
  );
};

const ProductRow = ({ product, index }) => {
  const [approveDialog, setApproveDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);
  const showApproveDialog = () => setApproveDialog(true);
  const showEditDialog = () => setEditDialog(true);
  const showRemoveDialog = () => setRemoveDialog(true);
  const showHistoryDialog = () => setHistoryDialog(true);
  const hideApproveDialog = () => setApproveDialog(false);
  const hideEditDialog = () => setEditDialog(false);
  const hideRemoveDialog = () => setRemoveDialog(false);
  const hideHistoryDialog = () => setHistoryDialog(false);

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div style={{ width: "110px" }}>
          <p className="text-success" style={{ cursor: "pointer" }} onClick={showEditDialog}>
            <FaPencilAlt /> Edit
          </p>
          <EditProduct
            show={editDialog}
            onHide={hideEditDialog}
            productId={product._id}
            product={product}
          />
          <p className="text-danger" style={{ cursor: "pointer" }} onClick={showRemoveDialog}>
            <FaTimes /> Delete
          </p>
          <RemoveProduct
            show={removeDialog}
            onHide={hideRemoveDialog}
            productId={product._id}
            name={product.name}
          />
          <p
            className="text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(product._id)}
          >
            <FaCopy /> Copy ID
          </p>
          {product.isApproved ? (
            <div className="text-success">
              <FaCheck /> Approved
            </div>
          ) : (
            <>
              <div
                onClick={showApproveDialog}
                className="text-danger"
                style={{ cursor: "pointer" }}
              >
                <FaTimes /> Approve
              </div>
              <ApproveProduct
                show={approveDialog}
                onHide={hideApproveDialog}
                productId={product._id}
                name={product.name}
              />
            </>
          )}
        </div>
      </td>
      <td>
        <a href={product.productImages[0]}>
          <img
            src={product.productImages[0] || "/assets/placeholders/product.png"}
            alt="Product"
            height="60px"
          />
        </a>
      </td>
      <td>{product.name}</td>
      <td>
        {product.description.length > 60
          ? `${product.description.substring(0, 60)}...`
          : product.description}
      </td>
      <td>{product.keywords?.join(", ")}</td>
      <td>
        {product.seller && (
          <p
            className="text-secondary"
            style={{ cursor: "pointer", width: "90px" }}
            onClick={() => navigator.clipboard.writeText(product.seller._id)}
          >
            <FaCopy /> Copy ID
          </p>
        )}
      </td>
      <td>₹{product.price}</td>
      <td>{product.countInStock}</td>
      <td style={{ maxWidth: "110px", wordWrap: "break-word" }}>
        {product.link && (
          <a href={product.link} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt /> {product.link}
          </a>
        )}
      </td>
      <td>{product.category}</td>
      <td style={{ minWidth: "110px" }}>{product.petType?.join(", ")}</td>
      <td>{product.breedType}</td>
      <td style={{ minWidth: "110px" }}>
        {product.weight === 0 ? "N/A" : `${product.weight} grams`}
      </td>
      <td style={{ minWidth: "110px" }}>
        {product.size.length === 0 && product.size.height === 0 && product.size.width === 0
          ? "N/A"
          : `${product.size?.length}cm x ${product.size?.height}cm x ${product.size?.width}cm`}
      </td>
      <td>
        {product.ageRange.min === 0 && product.ageRange.max === 0
          ? "All ages"
          : `${product.ageRange?.min}-${product.ageRange?.max} yrs`}
      </td>
      <td>
        {product.isVeg ? (
          <FaDotCircle className="text-success" />
        ) : (
          <FaDotCircle className="text-danger" />
        )}
      </td>
      <td style={{ minWidth: "150px" }}>
        {product.lastEdit && (
          <div className="text-center">
            <img
              src={product.lastEdit?.user?.profileImage || "/assets/placeholders/portrait.png"}
              width="30px"
              style={{ borderRadius: "100%" }}
            />
            <p className="mb-0">{product.lastEdit?.user?.name}</p>
            <p>{convertTime(product.lastEdit?.date)}</p>
            <p className="text-secondary" style={{ cursor: "pointer" }} onClick={showHistoryDialog}>
              <FaGlasses /> View History
            </p>
            <ProductHistory show={historyDialog} onHide={hideHistoryDialog} edits={product.edits} />
          </div>
        )}
      </td>
      <td>{convertTime(product.approvedAt)}</td>
      <td>{convertTime(product.createdAt)}</td>
      <td>{convertTime(product.updatedAt)}</td>
    </tr>
  );
};

export default ProductsDashboard;
