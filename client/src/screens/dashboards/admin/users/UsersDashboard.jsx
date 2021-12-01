// Dependencies
import { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaCheck, FaCopy, FaExternalLinkAlt, FaPencilAlt, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Components
import AddUser from "./AddUser.jsx";
import VerifyUser from "./VerifyUser.jsx";
import EditUser from "./EditUser.jsx";
import RemoveUser from "./RemoveUser.jsx";

// Helpers
import convertTime from "helpers/convertTime";

// Actions
import { getUsers } from "redux/actions/user";

const UsersDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("name");

  return (
    <div className="users-dashboard">
      <div className="d-flex justify-content-between">
        <Button onClick={showAddDialog} className="mb-3">
          Add a new user
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
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="role">Role</option>
          </Form.Select>
        </div>
      </div>
      <AddUser show={addDialog} onHide={hideAddDialog} />
      {users?.length > 0 ? (
        <Table responsive size="sm" className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Profile Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Role</th>
              <th>Directory</th>
              <th>Verification</th>
              <th>Date of Verification</th>
              <th>Date of Creation</th>
              <th>Date of Updation</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user[searchKey]?.toLowerCase().includes(searchValue.toLowerCase()))
              .map((user, index) => (
                <UserRow key={index} user={user} index={index} />
              ))}
          </tbody>
        </Table>
      ) : (
        <h3>No users found</h3>
      )}
    </div>
  );
};

const UserRow = ({ user, index }) => {
  const { user: currentUser } = useSelector((state) => state.user);

  const [verifyDialog, setVerifyDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const showVerifyDialog = () => setVerifyDialog(true);
  const showEditDialog = () => setEditDialog(true);
  const showRemoveDialog = () => setRemoveDialog(true);
  const hideVerifyDialog = () => setVerifyDialog(false);
  const hideEditDialog = () => setEditDialog(false);
  const hideRemoveDialog = () => setRemoveDialog(false);

  return (
    <tr>
      <td>{index}</td>
      <td>
        {user._id !== currentUser._id && (
          <div style={{ width: "90px" }}>
            <p className="text-success" style={{ cursor: "pointer" }} onClick={showEditDialog}>
              <FaPencilAlt /> Edit
            </p>
            <EditUser show={editDialog} onHide={hideEditDialog} userId={user._id} user={user} />
            <p className="text-danger" style={{ cursor: "pointer" }} onClick={showRemoveDialog}>
              <FaTimes /> Delete
            </p>
            <RemoveUser
              show={removeDialog}
              onHide={hideRemoveDialog}
              userId={user._id}
              name={user.name}
            />
            <p
              className="text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              <FaCopy /> Copy ID
            </p>
          </div>
        )}
      </td>
      <td>
        <a href={user.profileImage}>
          <img
            src={user.profileImage || "/assets/placeholders/portrait.png"}
            alt="Profile"
            height="60px"
          />
        </a>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.number}</td>
      <td>{user.role}</td>
      <td>
        {user.directory && (
          <div style={{ width: "90px" }}>
            <p
              className="text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => navigator.clipboard.writeText(user.directory._id)}
            >
              <FaCopy /> Copy ID
            </p>
            <a href={`/${user.directory.username}`} className="text-warning">
              <FaExternalLinkAlt /> {user.directory.storeName}
            </a>
          </div>
        )}
      </td>
      <td>
        {user.isVerified ? (
          <div className="text-success">
            <FaCheck /> Verified
          </div>
        ) : (
          <>
            <div onClick={showVerifyDialog} className="text-danger" style={{ cursor: "pointer" }}>
              <FaTimes /> Verify Now
            </div>
            <VerifyUser
              show={verifyDialog}
              onHide={hideVerifyDialog}
              userId={user._id}
              name={user.name}
            />
          </>
        )}
      </td>
      <td>{convertTime(user.verifiedAt)}</td>
      <td>{convertTime(user.createdAt)}</td>
      <td>{convertTime(user.updatedAt)}</td>
    </tr>
  );
};

export default UsersDashboard;
