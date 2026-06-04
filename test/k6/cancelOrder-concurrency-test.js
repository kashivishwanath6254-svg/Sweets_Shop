import http from "k6/http";

export default function () {
  const orderId = "6a2166259eed91277c22a307";

  const res = http.patch(
    `http://localhost:3000/api/orders/cancel/${orderId}`,
    null,
    {
      headers: {
        cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGIwNTFhMzY1ZTJkNWJhNWI3ZGU3ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzgwNTc0NjQyLCJleHAiOjE3ODA1NzgyNDJ9.o-ggCxfVXLDyK3NE1IiSCuNb-AexecArWeCl153Tzok",
      }
    }
  )

  console.log(res.status);
  console.log(res.body);
}
