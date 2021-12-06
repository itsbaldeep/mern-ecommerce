// Dependencies
import { useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { FaCopy, FaPencilAlt, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

// Components
import AddPet from "./AddPet.jsx";
import EditPet from "./EditPet.jsx";
import RemovePet from "./RemovePet.jsx";

// Helpers
import convertTime from "helpers/convertTime";

const PetsDashboard = () => {
  const { pets } = useSelector((state) => state.pet);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("name");

  return (
    <div className="pets-dashboard">
      <div className="d-flex justify-content-between">
        <Button onClick={showAddDialog} className="mb-3">
          Add a new pet
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
          </Form.Select>
        </div>
      </div>
      <AddPet show={addDialog} onHide={hideAddDialog} />
      {pets?.length > 0 ? (
        <Table responsive size="sm" className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Image</th>
              <th>Pet Name</th>
              <th>Description</th>
              <th>Breeds</th>
              <th>Categories</th>
              <th>Date of Creation</th>
              <th>Date of Updation</th>
            </tr>
          </thead>
          <tbody>
            {pets
              .filter((pet) => pet[searchKey]?.toLowerCase().includes(searchValue.toLowerCase()))
              .map((pet, index) => (
                <PetRow key={index} pet={pet} index={index} />
              ))}
          </tbody>
        </Table>
      ) : (
        <h3>No pets found</h3>
      )}
    </div>
  );
};

const PetRow = ({ pet, index }) => {
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
          <EditPet show={editDialog} onHide={hideEditDialog} petId={pet._id} pet={pet} />
          <p className="text-danger" style={{ cursor: "pointer" }} onClick={showRemoveDialog}>
            <FaTimes /> Delete
          </p>
          <RemovePet
            show={removeDialog}
            onHide={hideRemoveDialog}
            petId={pet._id}
            name={pet.name}
          />
          <p
            className="text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(pet._id)}
          >
            <FaCopy /> Copy ID
          </p>
        </div>
      </td>
      <td>
        <a href={pet.image}>
          <img src={pet.image || "/assets/placeholders/pet.png"} alt="Pet" height="60px" />
        </a>
      </td>
      <td>{pet.name}</td>
      <td>{pet.description}</td>
      <td>{pet.breeds.join(", ")}</td>
      <td>{pet.categories?.map((category) => category.name).join(", ")}</td>
      <td>{convertTime(pet.createdAt)}</td>
      <td>{convertTime(pet.updatedAt)}</td>
    </tr>
  );
};

export default PetsDashboard;
