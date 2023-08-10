import { headers } from "@/next.config";

export async function DELETE(req) {
  // const body = await req.json();
  // console.log(body);
  try {
    const response = await fetch(
      `https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/logout`,
      {
        method: "DELETE",
        credentials: "include", // This will ensure cookies are sent with the request
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log("COOKIE NOT CLEARED");
      throw new Error(data.message || "Failed to log out");
    }

    // If you need to remove a specific cookie, you can set its value to empty
    // and set the `Max-Age` attribute to 0. Here's an example for a cookie named 'authToken':
    // res.setHeader(
    //   "Set-Cookie",
    //   "_your_app_session=; Max-Age=0; Path=/; HttpOnly"
    // );
    // console.log("COOKIE CLEARED");

    // res.status(200).json({ message: "Logged out successfully" });
    return new Response(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": "_your_app_session=; Max-Age=0; Path=/; HttpOnly",
        },
      }
    );
  } catch (error) {)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
