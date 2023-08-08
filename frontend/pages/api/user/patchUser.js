export default async (req, res) => {
  try {
    const response = await fetch(
      "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/user",
      {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: req.body,
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error in patchUser API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
