// Dependencies
import { useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { FaCopy, FaPencilAlt, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

// Components
import AddCategory from "./AddCategory.jsx";
import EditCategory from "./EditCategory.jsx";
import RemoveCategory from "./RemoveCategory.jsx";

// Helpers
import convertTime from "helpers/convertTime";

const CategoriesDashboard = () => {
  const { categories } = useSelector((state) => state.category);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("name");

  return (
    <div className="categories-dashboard">
      <div className="d-flex justify-content-between">
        <Button onClick={showAddDialog} className="mb-3">
          Add a new category
        </Button>
        <div className="d-flex my-auto">
          <Form.Control
            type="text"
            value={searchValue}
            placeholder="Search for..."
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            style={{ width: "200px", height: "40px" }}
            className="mx-2"
          />
          <Form.Select
            value={searchKey}
            onChange={(e) => setSearchKey(e.currentTarget.value)}
            style={{ width: "100px", height: "40px" }}
          >
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="type">Type</option>
            <option value="pet">Pet</option>
          </Form.Select>
        </div>
      </div>
      <AddCategory show={addDialog} onHide={hideAddDialog} />
      {categories?.length > 0 ? (
        <Table responsive size="sm" className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Image</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Pet</th>
              <th>Documents</th>
              <th>Date of Creation</th>
              <th>Date of Updation</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((category) =>
                category[searchKey]?.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((category, index) => (
                <CategoryRow key={index} category={category} index={index} />
              ))}
          </tbody>
        </Table>
      ) : (
        <h3>No categories found</h3>
      )}
    </div>
  );
};

const CategoryRow = ({ category, index }) => {
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
          <EditCategory
            show={editDialog}
            onHide={hideEditDialog}
            categoryId={category._id}
            category={category}
          />
          <p className="text-danger" style={{ cursor: "pointer" }} onClick={showRemoveDialog}>
            <FaTimes /> Delete
          </p>
          <RemoveCategory
            show={removeDialog}
            onHide={hideRemoveDialog}
            categoryId={category._id}
            name={category.name}
          />
          <p
            className="text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(category._id)}
          >
            <FaCopy /> Copy ID
          </p>
        </div>
      </td>
      <td>
        <a href={category.image}>
          <img
            src={category.image || "/assets/placeholders/category.png"}
            alt="Category"
            height="60px"
          />
        </a>
      </td>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td>{category.type}</td>
      <td>{category.pet.join(", ")}</td>
      <td>{category.docs?.map((doc) => doc.name || doc.storeName).join(", ")}</td>
      <td>{convertTime(category.createdAt)}</td>
      <td>{convertTime(category.updatedAt)}</td>
    </tr>
  );
};

export default CategoriesDashboard;
