import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);
  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/getcategory`)
      .then((res) => {
        const fetchedCategories = res.data.result.map((category) => ({
          name: category.course_category_name,
          id: category.course_category_id,
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      });
  };

  const handleAddCategory = () => {
    inputFields.forEach(input => {
      if (input.value.trim()) {
        axios
          .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
            course_category_name: input.value,
          })
          .then((response) => {
            if (
              response.data.message === "Quiz and context created successfully."
            ) {
              toast.success("Category added successfully");
              fetchCategories();
            }
          })
          .catch((error) => {
            console.error("Error adding new category:", error);
            toast.error("Error adding new category");
          });
      }
    });
  };

  const handleAddInputField = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1, value: "" }]);
  };

  const handleInputChange = (id, newValue) => {
    setInputFields(
      inputFields.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <h4 className="text-center mb-5 headinginstructor">Course Category Creation</h4>
      <div className="row m-3 modpart p-1 p-lg-5">
        <div className="col-sm-12 col-md-7">
          {inputFields.map((input) => (
            <div key={input.id} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="fc1 form-control"
                placeholder="Enter Category name"
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
              <button
                className="ms-2 plusbtn text-light px-2"
                onClick={handleAddInputField}
              >
                +
              </button>
            </div>
          ))}
          <button
            className="mt-4 rounded-2 updatebtn p-2"
            onClick={handleAddCategory}
          >
            Submit
          </button>
        </div>

        <div className="col-sm-12 col-md-5">
          <div className="px-0 px-md-5">
            <h4 className="mb-4 mt-4 mt-md-0 categorytitle">Added Category List</h4>
            <div>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="card p-2 fc1">
                  <p className="m-0">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
