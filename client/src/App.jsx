import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

function App() {
  const [name, setName] = useState("");
  const [Dept, setDept] = useState("");
  const [Designation, setDesignation] = useState("");
  const [Salary, setSalary] = useState("");
  const [dob, setDob] = useState("");
  const [Address, setAddress] = useState("");

  const [Data, setData] = useState([]);
  const [X, setX] = useState(false);

  useEffect(() => {
    fetchData();
  }, [X]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/employee");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setX(true);
    try {
      await axiosInstance.post("/employee/add", {
        name: name,
        Dept: Dept,
        Designation: Designation,
        Salary: Salary,
        dob: dob,
        Address: Address,
      });
      // Clear input fields after submission
      setName("");
      setDept("");
      setDesignation("");
      setSalary("");
      setDob("");
      setAddress("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={onSubmit} className="my-8">
        <input
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          className="block mb-4 p-2 border border-gray-300"
        />
        <input
          value={Dept}
          placeholder="Enter Dept"
          onChange={(e) => setDept(e.target.value)}
          className="block mb-4 p-2 border border-gray-300"
        />
        <input
          value={Designation}
          placeholder="Enter Designation"
          onChange={(e) => setDesignation(e.target.value)}
          className="block mb-4 p-2 border border-gray-300"
        />
        <input
          value={Salary}
          placeholder="Enter Salary"
          onChange={(e) => setSalary(e.target.value)}
          className="block mb-4 p-2 border border-gray-300"
        />
        <input
          value={dob}
          placeholder="Enter DOB"
          onChange={(e) => setDob(e.target.value)}
          className="block mb-4 p-2 border border-gray-300"
        />
        <input
          value={Address}
          placeholder="Enter Address"
          onChange={(e) => setAddress(e.target.value)}
          className="block mb-4 p-2 border border-gray-300"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <div className="my-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Dept</th>
              <th className="py-2 px-4 border-b">Designation</th>
              <th className="py-2 px-4 border-b">Salary</th>
              <th className="py-2 px-4 border-b">DOB</th>
              <th className="py-2 px-4 border-b">Address</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((e) => (
              <tr key={e.Name} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{e.Name}</td>
                <td className="py-2 px-4 border-b">{e.Dept}</td>
                <td className="py-2 px-4 border-b">{e.Designation}</td>
                <td className="py-2 px-4 border-b">{e.Salary}</td>
                <td className="py-2 px-4 border-b">{e.DOB}</td>
                <td className="py-2 px-4 border-b">{e.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
