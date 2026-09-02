
export const healthcheck = (req, res) => {
    try {
        return res.status(200)
            .json({ status: 200, data: {}, message: "OK" });

    } catch (error) {
        console.error("HealthCheck error:", error);
        return res.status(500)
            .json({ status: 500, message: "Internal Server Error" })
    }
}