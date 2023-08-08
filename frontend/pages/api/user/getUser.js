export default async (req, res) => {
  try {
    const response = await fetch(
      "https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/user",
      {
        credentials: "include",
        method: "GET",
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error in getUser API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
