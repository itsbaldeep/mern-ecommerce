// Dependencies
import { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { FaCheck, FaCopy, FaExternalLinkAlt, FaPencilAlt, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Components
import AddDirectory from "./AddDirectory.jsx";
import ApproveDirectory from "./ApproveDirectory.jsx";
import EditDirectory from "./EditDirectory.jsx";
import RemoveDirectory from "./RemoveDirectory.jsx";

// Helpers
import convertTime from "helpers/convertTime";

// Actions
import { getAllDirectories } from "redux/actions/directory";

const DirectoriesDashboard = () => {
  const dispatch = useDispatch();
  const { directories } = useSelector((state) => state.directory);

  useEffect(() => {
    dispatch(getAllDirectories());
  }, [dispatch]);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("storeName");

  return (
    <div className="directories-dashboard">
      <div className="d-flex justify-content-between">
        <Button onClick={showAddDialog} className="mb-3">
          Add a new directory
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
            <option value="storeName">Name</option>
            <option value="_id">Directory ID</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="address">Address</option>
            <option value="state">State</option>
            <option value="pincode">Pincode</option>
          </Form.Select>
        </div>
      </div>
      <AddDirectory show={addDialog} onHide={hideAddDialog} />
      {directories?.length > 0 ? (
        <Table responsive size="sm" className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Directory Images</th>
              <th>Business/Store Name</th>
              <th>Address</th>
              <th>Number</th>
              <th>Categories</th>
              <th>Email</th>
              <th>Description</th>
              <th>Website</th>
              <th>Tagline</th>
              <th>Username</th>
              <th>User</th>
              <th>Approval</th>
              <th>Date of Approval</th>
              <th>Date of Creation</th>
              <th>Date of Updation</th>
            </tr>
          </thead>
          <tbody>
            {directories
              .filter((user) => user[searchKey]?.toLowerCase().includes(searchValue.toLowerCase()))
              .map((directory, index) => (
                <DirectoryRow key={index} directory={directory} index={index} />
              ))}
          </tbody>
        </Table>
      ) : (
        <h3>No directories found</h3>
      )}
    </div>
  );
};

const DirectoryRow = ({ directory, index }) => {
  const [approveDialog, setApproveDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const showApproveDialog = () => setApproveDialog(true);
  const showEditDialog = () => setEditDialog(true);
  const showRemoveDialog = () => setRemoveDialog(true);
  const hideApproveDialog = () => setApproveDialog(false);
  const hideEditDialog = () => setEditDialog(false);
  const hideRemoveDialog = () => setRemoveDialog(false);

  const address = `${directory.address}, ${directory.city}, ${directory.state}, ${directory.pincode}`;

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div style={{ width: "90px" }}>
          <p className="text-success" style={{ cursor: "pointer" }} onClick={showEditDialog}>
            <FaPencilAlt /> Edit
          </p>
          <EditDirectory
            show={editDialog}
            onHide={hideEditDialog}
            directoryId={directory._id}
            directory={directory}
          />
          <p className="text-danger" style={{ cursor: "pointer" }} onClick={showRemoveDialog}>
            <FaTimes /> Delete
          </p>
          <RemoveDirectory
            show={removeDialog}
            onHide={hideRemoveDialog}
            directoryId={directory._id}
            name={directory.name}
          />
          <p
            className="text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(directory._id)}
          >
            <FaCopy /> Copy ID
          </p>
        </div>
      </td>

      <td>
        <a href={directory.directoryImages[0]}>
          <img
            src={directory.directoryImages[0] || "/assets/placeholders/store.png"}
            alt="Directory"
            height="60px"
          />
        </a>
      </td>
      <td>{directory.storeName}</td>
      <td>{address.length > 60 ? `${address.substring(0, 60)}...` : address}</td>
      <td>{directory.number}</td>
      <td>{directory.category.join(", ")}</td>
      <td>{directory.email}</td>
      <td>{directory.description}</td>
      <td>
        {directory.website && (
          <a href={directory.website} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt /> {directory.website}
          </a>
        )}
      </td>
      <td>{directory.tagline}</td>
      <td>
        {directory.username !== directory._id && (
          <a href={`/${directory.username}`}>{directory.username}</a>
        )}
      </td>
      <td>
        {directory.user && (
          <p
            className="text-secondary"
            style={{ cursor: "pointer", width: "90px" }}
            onClick={() => navigator.clipboard.writeText(directory.user._id)}
          >
            <FaCopy /> Copy ID
          </p>
        )}
      </td>
      <td>
        {directory.isApproved ? (
          <div className="text-success">
            <FaCheck /> Approved
          </div>
        ) : (
          <>
            <div onClick={showApproveDialog} className="text-danger" style={{ cursor: "pointer" }}>
              <FaTimes /> Approve Now
            </div>
            <ApproveDirectory
              show={approveDialog}
              onHide={hideApproveDialog}
              directoryId={directory._id}
              name={directory.name}
            />
          </>
        )}
      </td>
      <td>{convertTime(directory.approvedAt)}</td>
      <td>{convertTime(directory.createdAt)}</td>
      <td>{convertTime(directory.updatedAt)}</td>
    </tr>
  );
};

export default DirectoriesDashboard;
