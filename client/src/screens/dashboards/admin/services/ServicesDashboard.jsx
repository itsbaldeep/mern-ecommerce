// Dependencies
import { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { FaCheck, FaCopy, FaExternalLinkAlt, FaPencilAlt, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Components
import AddService from "./AddService.jsx";
import ApproveService from "./ApproveService.jsx";
import EditService from "./EditService.jsx";
import RemoveService from "./RemoveService.jsx";

// Helpers
import convertTime from "helpers/convertTime";
import { binaryToArray } from "helpers/daysHandler.js";

// Actions
import { getAllServices } from "redux/actions/service";

const ServicesDashboard = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("name");

  return (
    <div className="services-dashboard">
      <div className="d-flex justify-content-between">
        <Button onClick={showAddDialog} className="mb-3">
          Add a new service
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
            <option value="seller">Seller ID</option>
            <option value="nameOfIncharge">Name of Incharge</option>
            <option value="numberOfIncharge">Number of Incharge</option>
            <option value="category">Category</option>
          </Form.Select>
        </div>
      </div>
      <AddService show={addDialog} onHide={hideAddDialog} />
      {services?.length > 0 ? (
        <Table responsive size="sm" className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Service Images</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Days</th>
              <th>Link</th>
              <th>Category</th>
              <th>Pet Type</th>
              <th>Breed Type</th>
              <th>Timings</th>
              <th>Age Range</th>
              <th>Date of Approval</th>
              <th>Date of Creation</th>
              <th>Date of Updation</th>
            </tr>
          </thead>
          <tbody>
            {services
              .filter((service) =>
                service[searchKey]?.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((service, index) => (
                <ServiceRow key={index} service={service} index={index} />
              ))}
          </tbody>
        </Table>
      ) : (
        <h3>No services found</h3>
      )}
    </div>
  );
};

const ServiceRow = ({ service, index }) => {
  const [approveDialog, setApproveDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const showApproveDialog = () => setApproveDialog(true);
  const showEditDialog = () => setEditDialog(true);
  const showRemoveDialog = () => setRemoveDialog(true);
  const hideApproveDialog = () => setApproveDialog(false);
  const hideEditDialog = () => setEditDialog(false);
  const hideRemoveDialog = () => setRemoveDialog(false);

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div style={{ width: "110px" }}>
          <p className="text-success" style={{ cursor: "pointer" }} onClick={showEditDialog}>
            <FaPencilAlt /> Edit
          </p>
          <EditService
            show={editDialog}
            onHide={hideEditDialog}
            serviceId={service._id}
            service={service}
          />
          <p className="text-danger" style={{ cursor: "pointer" }} onClick={showRemoveDialog}>
            <FaTimes /> Delete
          </p>
          <RemoveService
            show={removeDialog}
            onHide={hideRemoveDialog}
            serviceId={service._id}
            name={service.name}
          />
          <p
            className="text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(service._id)}
          >
            <FaCopy /> Copy ID
          </p>
          {service.isApproved ? (
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
              <ApproveService
                show={approveDialog}
                onHide={hideApproveDialog}
                serviceId={service._id}
                name={service.name}
              />
            </>
          )}
        </div>
      </td>
      <td>
        <a href={service.serviceImages[0]}>
          <img
            src={service.serviceImages[0] || "/assets/placeholders/service.png"}
            alt="Service"
            height="60px"
          />
        </a>
      </td>
      <td>{service.name}</td>
      <td>
        {service.description.length > 60
          ? `${service.description.substring(0, 60)}...`
          : service.description}
      </td>
      <td>
        {service.seller && (
          <p
            className="text-secondary"
            style={{ cursor: "pointer", width: "90px" }}
            onClick={() => navigator.clipboard.writeText(service.seller._id)}
          >
            <FaCopy /> Copy ID
          </p>
        )}
      </td>
      <td>₹{service.price}</td>
      <td style={{ width: "150px" }}>
        {service.days === 127 ? "Everyday" : binaryToArray(service.days).join(", ")}
      </td>
      <td>
        {service.link && (
          <a href={service.link} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt /> {service.link}
          </a>
        )}
      </td>
      <td>{service.category}</td>
      <td style={{ minWidth: "110px" }}>{service.petType?.join(", ")}</td>
      <td>{service.breedType}</td>
      <td style={{ minWidth: "110px" }}>
        {service.timings?.from} to {service.timings?.to}
      </td>
      <td>
        {service.ageRange.min === 0 && service.ageRange.max === 0
          ? "All ages"
          : `${service.ageRange?.min}-${service.ageRange?.max} yrs`}
      </td>
      <td>{convertTime(service.approvedAt)}</td>
      <td>{convertTime(service.createdAt)}</td>
      <td>{convertTime(service.updatedAt)}</td>
    </tr>
  );
};

export default ServicesDashboard;
