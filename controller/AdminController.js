import jwt from "jsonwebtoken";
import Reservation from "../model/reservationModel.js"

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API for Adding Reservations
const addReservation = async (req, res) => {
    try {
        console.log("Headers:", req.headers);
        console.log("Received Data:", req.body); 

        const { name, email, date, time, guests, requests } = req.body;

        if (!name || !email || !date || !time || !guests) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, date, time, guests) are required."
            });
        }

        const newReservation = new Reservation({ name, email, date, time, guests, requests });

        await newReservation.save();

        res.status(200).json({
            success: true,
            message: "Reservation added successfully",
            reservation: newReservation
        });

    } catch (error) {
        console.error("Error in addReservation:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// API for Fetching Reservations
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find(); 
        res.status(200).json({ success: true, reservations });
    } catch (error) {
        console.error("Error in getReservations:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// API for Updating Reservations
const updateReservationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    console.log(`Updating reservation ID: ${id} with status: ${status}`); 

    if (!status || !["confirmed", "cancelled"].includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    try {
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        reservation.status = status; 
        await reservation.save();

        console.log(`Reservation ID: ${id} updated to status: ${status}`); 
        res.status(200).json({ success: true, message: `Reservation ${status} successfully`, reservation });
    } catch (error) {
        console.error("Error updating reservation status:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};




export { loginAdmin, addReservation, getReservations,updateReservationStatus}; 
