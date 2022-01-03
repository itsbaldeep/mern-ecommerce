// Dependencies
import { useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { FaCopy, FaPencilAlt, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

// Components
import AddBrand from "./AddBrand.jsx";
import EditBrand from "./EditBrand.jsx";
import RemoveBrand from "./RemoveBrand.jsx";

// Helpers
import convertTime from "helpers/convertTime";

const BrandsDashboard = () => {
  const { brands } = useSelector((state) => state.brand);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("name");

  return (
    <div className="brands-dashboard">
      <div className="d-sm-flex justify-content-between mb-3">
        <Button onClick={showAddDialog} className="mb-3 mb-sm-0">
          Add a new brand
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
          </Form.Select>
        </div>
      </div>
      <AddBrand show={addDialog} onHide={hideAddDialog} />
      {brands?.length > 0 ? (
        <Table responsive size="sm" className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Logo</th>
              <th>Brand Name</th>
              <th>Description</th>
              <th>Sellers</th>
              <th>Products</th>
              <th>Date of Creation</th>
              <th>Date of Updation</th>
            </tr>
          </thead>
          <tbody>
            {brands
              .filter((brand) =>
                brand[searchKey]?.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((brand, index) => (
                <BrandRow key={index} brand={brand} index={index} />
              ))}
          </tbody>
        </Table>
      ) : (
        <h3>No brands found</h3>
      )}
    </div>
  );
};

const BrandRow = ({ brand, index }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const showEditDialog = () => setEditDialog(true);
  const showRemoveDialog = () => setRemoveDialog(true);
  const hideEditDialog = () => setEditDialog(false);
  const hideRemoveDialog = () => setRemoveDialog(false);

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div style={{ width: "90px" }}>
          <p className="text-success" style={{ cursor: "pointer" }} onClick={showEditDialog}>
            <FaPencilAlt /> Edit
          </p>
          <EditBrand show={editDialog} onHide={hideEditDialog} brandId={brand._id} brand={brand} />
          <p className="text-danger" style={{ cursor: "pointer" }} onClick={showRemoveDialog}>
            <FaTimes /> Delete
          </p>
          <RemoveBrand
            show={removeDialog}
            onHide={hideRemoveDialog}
            brandId={brand._id}
            name={brand.name}
          />
          <p
            className="text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(brand._id)}
          >
            <FaCopy /> Copy ID
          </p>
        </div>
      </td>
      <td>
        <a href={brand.logo || null}>
          <img src={brand.logo || "/assets/placeholders/brand.png"} alt="Brand" height="60px" />
        </a>
      </td>
      <td>{brand.name}</td>
      <td>
        {brand.description.length > 60
          ? `${brand.description.substring(0, 60)}...`
          : brand.description}
      </td>
      <td>{brand.sellers.map((seller) => seller.storeName).join(", ")}</td>
      <td>{brand.products?.map((product) => product.name).join(", ")}</td>
      <td>{convertTime(brand.createdAt)}</td>
      <td>{convertTime(brand.updatedAt)}</td>
    </tr>
  );
};

export default BrandsDashboard;
