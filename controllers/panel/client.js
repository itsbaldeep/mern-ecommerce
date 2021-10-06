const Client = require("../../models/Client");
const ErrorResponse = require("../../utils/errorResponse");

// Admin is already authenticated

// GET /panel/client/
exports.getClient = async (req, res, next) => {
    try {
        const clients = await Client.find();
        return res.status(200).json({
            success: true,
            clients,
        });
    } catch (error) {
        next(error);
    }
};

// GET /panel/client/:id
exports.getClientById = async (req, res, next) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return next(new ErrorResponse("Client not found", 404));
        }
        return res.status(200).json({
            success: true,
            client,
        });
    } catch (error) {
        next(error);
    }
};

// POST /panel/client/add
exports.addClient = async (req, res, next) => {
    try {
        const client = await Client.create({ ...req.body });
        client.isVerified = true;
        await client.save();
        res.status(200).json({
            success: true,
            client,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /panel/client/remove/:id
exports.removeClient = async (req, res, next) => {
    try {
        const client = await Client.findById(req.params.id);
        // Check if the client exists
        if (!client) {
            return next(new ErrorResponse("Client not found", 404));
        }
        // Delete the client
        await client.remove();
        return res.status(200).json({
            success: true,
            message: "Client succesfully removed",
            client,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /panel/client/edit/:id
exports.editClient = async (req, res, next) => {
    try {
        const client = await Client.findById(req.params.id);
        // Check if the client exists
        if (!client) {
            return next(new ErrorResponse("Client not found", 404));
        }
        // Updating the client
        const result = await client.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.status(200).json({
            success: true,
            updated: req.body,
            message: "Client succesfully updated",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
