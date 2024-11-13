import React, { useEffect, useState } from "react";
import "./AddCourse.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


function AddCourse() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Single category ID
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];









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
      });
  };


    const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory("");
  };
  const handleOpenModal1 = () => {
    setIsModalOpen1(true);
  };
  
  const handleCloseModal1 = () => {
    setIsModalOpen1(false);
    setNewCategory(""); // Clear the category name after closing
  };
  
  const handleOpenModal2 = () => {
    setIsModalOpen2(true);  // Use setIsModalOpen2 instead of setIsModalOpen1
  };
  
  const handleCloseModal2 = () => {
    setIsModalOpen2(false); // Use setIsModalOpen2 instead of setIsModalOpen1
    setNewCategory("");  // Clear the category name after closing
  };
  
  const handleOpenModal3 = () => {
    setIsModalOpen3(true);  // Use setIsModalOpen3 instead of setIsModalOpen1
  };
  
  const handleCloseModal3 = () => {
    setIsModalOpen3(false);  // Use setIsModalOpen3 instead of setIsModalOpen1
    setNewCategory("");  // Clear the category name after closing
  };
  
  const handleOpenModal4 = () => {
    setIsModalOpen4(true);  // Use setIsModalOpen4 instead of setIsModalOpen1
  };
  
  const handleCloseModal4 = () => {
    setIsModalOpen4(false);  // Use setIsModalOpen4 instead of setIsModalOpen1
    setNewCategory("");  // Clear the category name after closing
  };
  
  const options = [
    {
      value: 0,
      label: 'Angular',
      selected: true,
    },
    {
      value: 1,
      label: 'Bootstrap',
      selected: true,
      disabled: true,
    },
    {
      value: 2,
      label: 'React.js',
    },
    {
      value: 3,
      label: 'Vue.js',
    },
    {
      label: 'backend',
      options: [
        {
          value: 4,
          label: 'Django',
        },
        {
          value: 5,
          label: 'Laravel',
          selected: true,
        },
        {
          value: 6,
          label: 'Node.js',
        },
      ],
    },
  ]

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };



  const handleAddCategory1 = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
        }
        handleCloseModal1();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };


  const handleAddCategory2 = () => {
    if (newCategory.trim() === "") return;
  
    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories();
        }
        handleCloseModal2(); // Close the modal specific to this function
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };
  
  const handleAddCategory3 = () => {
    if (newCategory.trim() === "") return;
    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
        }
        handleCloseModal3();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };


  const handleAddCategory4 = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
        }
        handleCloseModal4();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const courseFullName = form.courseFullName.value;
    const courseShortName = form.courseShortName.value;
    const courseStartDate = form.courseStartDate.value;
    const courseEndDate = form.courseEndDate.value;
    const courseImage = form.courseImage.files[0];
    const courseDescription = form.courseDescription.value;

    // Validate required fields
    if (
      !courseFullName ||
      !courseShortName ||
      !courseStartDate ||
      !courseEndDate ||
      !courseImage ||
      !courseDescription ||
      !selectedCategoryId // Ensure a category is selected
    ) {
      alert("All fields are required.");
      return;
    }

    // Prepare form data for the API
    const formData = new FormData();
    formData.append("courseFullName", courseFullName);
    formData.append("courseShortName", courseShortName);
    formData.append("courseStartDate", courseStartDate);
    formData.append("courseEndDate", courseEndDate);
    formData.append("courseImage", courseImage); // Handle image upload in the backend
    formData.append("courseDescription", courseDescription);
    formData.append("courseCategoryId", selectedCategoryId); // Single ID for category

    console.log(formData);

    try {
      // Send the form data to the backend API
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}course/addcourse`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Course and context added successfully") {
        toast.success("Course added successfully");

        // Reset form fields
        form.reset();
        setSelectedCategoryId(null);
        setNewCategory("");
      } else {
        toast.error(response.data.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <h3 className="text-center mt-2">Course Creation</h3>
      <div className="frmbg p-0 p-lg-5 h-100 my-3 rounded-3">
        <form className="bg-light rounded-2 p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseFullName">Course Full Name</label>
              <input
                id="courseFullName"
                name="courseFullName"
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseShortName">Course Short Name</label>
              <input
                id="courseShortName"
                name="courseShortName"
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseCategory">Course Category</label>
              <select
                id="courseCategory"
                name="courseCategory"
                className="form-control"
                onChange={(e) => setSelectedCategoryId(e.target.value)} // Set single ID
                value={selectedCategoryId || ""}
              >
                <option value="">Select the course category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseStartDate">Course Start Date</label>
              <input
                id="courseStartDate"
                name="courseStartDate"
                type="date"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseEndDate">Course End Date</label>
              <input
                id="courseEndDate"
                name="courseEndDate"
                type="date"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseImage">Course Image</label>
              <input
                id="courseImage"
                name="courseImage"
                type="file"
                className="form-control"
                accept=".jpg, .jpeg"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                className="form-control"
              ></textarea>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="learningobjective">Learning Objective</label>
              <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      className="w-100"
      renderInput={(params) => (
        <TextField {...params}  placeholder="Select Learning Objective" />
      )}
    />
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal1}
              >
                +
              </button>
            </div>
          </div>




          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="Learningoutcomes">Learning Outcomes</label>
  <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      className=" w-100"
      renderInput={(params) => (
        <TextField {...params}  placeholder="Select Learning Outcomes" />
      )}
    />
    <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal2}
              >
                +
              </button>
            </div>
          </div>


          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="Learningoutcomes">Pre - Requisite</label>
            
              <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      className="autocomplete-responsive w-100"
      renderInput={(params) => (
        <TextField {...params}  placeholder="Select Pre - Requisite" />
      )}
    />
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal3}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="Learningoutcomes">Learner Group</label>
              <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      className=" w-100"
      renderInput={(params) => (
        <TextField {...params} placeholder="Select Learner Group" />
      )}
    />
              
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal4}
              >
                +
              </button>
            </div>
          </div>
          <input type="submit" className="frmbutton rounded-1 p-2" />
        </form>
      </div>


     {/* Modal for Adding Category (isModalOpen) */}
{isModalOpen && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Category</h5>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="form-control w-100"
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleAddCategory}
          >
            Add
          </button>
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Modal for Learning Objective (isModalOpen1) */}
{isModalOpen1 && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Learning Objective</h5>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter Learning Objective"
            className="form-control"
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleAddCategory1}
          >
            Add
          </button>
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleCloseModal1}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

     
{isModalOpen2 && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Learning Outcomes </h5>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter Learning Outcomes"
            className="form-control"
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleAddCategory2}
          >
            Add
          </button>
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleCloseModal2}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}


{isModalOpen3 && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Pre-Requisite</h5>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter Pre-Requisite"
            className="form-control"
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleAddCategory3}
          >
            Add
          </button>
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleCloseModal3}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{isModalOpen4 && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Learner Group</h5>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter Learner Group"
            className="form-control"
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleAddCategory4}
          >
            Add
          </button>
          <button
            type="button"
            className="addmodalbtn p-2 rounded-2"
            onClick={handleCloseModal4}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}   
     
    </div>
  );
}

export default AddCourse;
