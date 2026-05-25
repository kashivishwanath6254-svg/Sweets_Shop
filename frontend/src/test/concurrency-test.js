import http from "k6/http";

export default function () {
  const response = http.post(
    "http://localhost:3000/api/orders",
    JSON.stringify({
      shippingAddress: {
        "fullName": "Rahul Sharma",
        "phone": "9876543210",
        "street": "123 Main Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "postalCode": "400001",
        "country": "India"
      },
      paymentMethod: "COD",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        cookie: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGIwNTFhMzY1ZTJkNWJhNWI3ZGU3ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc5NzMwNzI1LCJleHAiOjE3Nzk3MzQzMjV9.JPwVm8SJuWiJKJ1niJaIFjG5hQpgHNWZjlRG7mUH6lY",
      }
    }
  );
  console.log(response.status);
  console.log(response.body);
}
