import axios from "axios";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import React, { useEffect, useState } from "react";
import "./ModuleUpdate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
function ModuleUpdate() {
  const [modules, setModules] = useState([]);
  const [selected, setSelected] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [path, setPath] = useState("");
  const [parentModule, setParentModule] = useState("");
  const [moduleStructure, setModuleStructure] = useState({});
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [updatedModuleName, setUpdatedModuleName] = useState("");
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const top100Films = [
    {id:1, title: 'The Shawshank Redemption', year: 1994 },
    {id:2, title: 'The Godfather', year: 1972 },
    {id:3, title: 'The Godfather: Part II', year: 1974 },
    { id:4,title: 'The Dark Knight', year: 2008 },
    { id:5,title: '12 Angry Men', year: 1957 },
    {id:6, title: "Schindler's List", year: 1993 },
    {id:7, title: 'Pulp Fiction', year: 1994 },
    {
      id:8,title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },  
  ];
  useEffect(() => {
    // Fetch the list of modules from the backend and log the result
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModules(res.data.result); // Store fetched modules in state
        console.log("Modules fetched from API:", res.data.result); // Debug log to ensure modules are received
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/structured-data`)
      .then((res) => {
        setCourses(res.data);
        setModuleStructure(buildModuleStructure(res.data));
      })
      .catch((error) => {
        toast.error("Failed to fetch courses!");
        console.error(error);
      });
  }, []);

  const buildModuleStructure = (nodes, parent = null) => {
    const structure = {};

    nodes.forEach((node, index) => {
      const path = `${index + 1}`;
      structure[node.value] = { path, parent: parent ? parent.value : null };

      if (node.children && node.children.length > 0) {
        traverseChildren(node.children, path, structure, node);
      }
    });

    return structure;
  };

  const findTopParentValue = (nodeValue) => {
    const findParent = (nodes, value) => {
      for (const node of nodes) {
        if (node.value === value) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          const result = findParent(node.children, value);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };

    let currentNode = findParent(courses, nodeValue);

    // Traverse up to find the top-most parent
    while (currentNode && currentNode.parent) {
      currentNode = findParent(courses, currentNode.parent);
    }

    return currentNode ? currentNode.value : null;
  };

  const traverseChildren = (children, parentPath, structure, parent) => {
    children.forEach((child, index) => {
      const childPath = `${parentPath}/${index + 1}`;
      structure[child.value] = { path: childPath, parent: parent.value };

      if (child.children && child.children.length > 0) {
        traverseChildren(child.children, childPath, structure, child);
      }
    });
  };

  const findTopMostParent = (nodeValue, nodes) => {
    for (const node of nodes) {
      if (node.value === nodeValue) {
        return null; // This is the topmost parent
      }

      if (node.children) {
        const result = findTopMostParent(nodeValue, node.children);
        if (result !== null) {
          return result; // Return the topmost parent found in children
        }
      }
    }

    return null; // No parent found
  };

  const getTopMostParent = (nodeValue) => {
    return findTopMostParent(nodeValue, courses);
  };

  const findNextNumber = (path) => {
    const parts = path.split("/");
    if (parts.length === 0) return 1;
    const lastPart = parts[parts.length - 1];
    const nextNumber = parseInt(lastPart, 10) + 1;
    return nextNumber;
  };

  const findParentNode = (nodes, nodeValue) => {
    for (const node of nodes) {
      if (node.children) {
        const child = node.children.find((child) => child.value === nodeValue);
        if (child) {
          return node; // Parent found
        }
        const result = findParentNode(node.children, nodeValue);
        if (result) return result; // Parent found in a deeper level
      }
    }
    return null; // No parent found
  };

  const addNewModule = (parentNode, newModuleName) => {
    const parentPath = moduleStructure[parentNode.value] || "";
    const nextNumber = findNextNumber(parentPath);
    const newPath = `${parentPath}/${nextNumber}`;

    const newModule = {
      value: newModuleName,
      children: [],
    };

    const updatedCourses = [...courses];
    const parent = findParentNode(updatedCourses, parentNode.value);
    if (parent) {
      const index = parent.children.findIndex(
        (child) => child.value === parentNode.value
      );
      if (index !== -1) {
        if (!parent.children[index].children) {
          parent.children[index].children = [];
        }
        parent.children[index].children.push(newModule);
      }
    }

    setModuleStructure((prevStructure) => ({
      ...prevStructure,
      [newModuleName]: newPath,
    }));

    setCourses(updatedCourses);
  };

  const handleChange = (currentNode, selectedNodes, newModuleName) => {
    setSelected(selectedNodes);
    setSelectedNode(currentNode);

    if (currentNode) {
      const nodePath = moduleStructure[currentNode.value] || "";

      if (newModuleName) {
        addNewModule(currentNode, newModuleName);
      } else {
        setPath(nodePath); // Ensure nodePath is a string
      }

      const parentNode = findParentNode(courses, currentNode.value);
      setParentModule(parentNode ? parentNode.value : "");

      setSelectedModuleId(currentNode.value || "");

      // Get the top-most parent value
      const topParentValue = findTopParentValue(currentNode.value);
      console.log("Top Most Parent Value:", topParentValue);
    }
  };
  const handleUpdateModule = () => {
    // Ensure a module is selected and a new name is provided
    if (!selectedModuleId || !updatedModuleName) {
      toast.error("Please select a module and enter a new name.");
      return;
    }

    // Send the updated module name to the backend
    axios
      .put(`${process.env.REACT_APP_API_URL}course/updatemodule`, {
        moduleid: selectedModuleId,
        modulename: updatedModuleName,
      })
      .then((res) => {
        if (res.data.message === "Module updated successfully") {
          toast.success("Module updated successfully!");
          setUpdatedModuleName(""); // Clear the input field
          setSelectedModuleId(""); // Clear the dropdown
        } else {
          toast.error("Failed to update module");
        }
      })
      .catch((err) => {
        console.error("Error updating module:", err);
        toast.error("Failed to update module.");
      });
  };

  // Handle dropdown change and set the module name in the input box
  const handleModuleSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedModuleId(selectedId);

    // Log the selected module ID for debugging
    console.log("Selected Module ID:", selectedId);

    // Find the selected module by its id and set its name into the input box
    const selectedModule = modules.find(
      (module) => module.moduleid == selectedId
    ); // Use == for string/number comparisons
    if (selectedModule) {
      setUpdatedModuleName(selectedModule.modulename); // Display selected module name in the input
      console.log("Selected module:", selectedModule); // Debug log the module object
    } else {
      setUpdatedModuleName(""); // Clear the input if no module is selected
      console.log("No matching module found."); // Log if no module was found
    }
  };

  const [selectedImageModuleId, setSelectedImageModuleId] = useState("");
  const [moduleImage, setModuleImage] = useState(null);

  const handleImageModuleSelection = (e) => {
    setSelectedImageModuleId(e.target.value);
  };

  const handleUpdateModuleImage = async () => {
    if (!selectedImageModuleId || !moduleImage) {
      alert("Please select a module and an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("moduleImage", moduleImage);

    // console.log(formData);

    try {
      axios.put(
        `${process.env.REACT_APP_API_URL}course/${selectedImageModuleId}/image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      ).then(res=>{
        if(res.data.message === "Module image updated successfully"){
          toast.success("Module image updated successfully")
        }
        else if(res.data.message === "Server error"){
          toast.error("Server error")
        }
        else if(res.data.message === "Module not found"){
          toast.error("Module not found")
        }
      })
    } catch (error) {
      console.error("Error updating module image:", error);
    }
  };

  return (
    <div className="container-fluid modup">
      <h2 className="module2 text-center">Update Module Name</h2>
      <div className="module-update-container frmbg  p-4">
        <ToastContainer />
<form>

  <div className="form-group">
    <div className="form-group-inner">
<label className="labeltext">Select Course</label>
<DropdownTreeSelect
          data={courses}
          onChange={handleChange}
          className="bootstrap-demo w-100"
          texts={{ placeholder: "Select..." }}
          value={selectedNode ? [selectedNode] : []} />
           <ToastContainer />
    </div>
  </div>

  <div className="form-group w-100">
    <div className="form-group-inner w-100">
    <label className="labeltext">Select Module</label>
          <select
            value={selectedModuleId}
            onChange={handleModuleSelection}
            className="selectbox fc1 w-100 py-2"
          >
            <option value="">--Select Module--</option>
            {modules.map((module) => (
              <option key={module.moduleid} value={module.moduleid}>
                {module.modulename}
              </option>
            ))}
          </select>
    </div>
  </div>

  <div className="form-group">
    <div className="form-group-inner">
    <label className="labeltext">New Module Name</label>
    <input
            type="text"
            value={updatedModuleName}
            onChange={(e) => setUpdatedModuleName(e.target.value)} // Allow editing the input value
            className="inp1 fc1"
            placeholder="Enter New Module Name"
          />
    </div>
  </div>


<div className="form-group">
<div className="form-group-inner">
<label className="labeltext">New Module Image</label> 
<input type="file"
            onChange={(e) => setModuleImage(e.target.files[0])}
            className="file-input fc1"
            accept="image/*"
          /> 
</div>
</div>


<div className="form-group">
  <div className="form-group-inner my-2">
  <label htmlFor="moduleImage" className="labeltext">Learner Objectives</label>
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
        <TextField {...params}  placeholder="Select Learner Objectives" />
      )}
    />
  </div>
</div>

<div className="form-group">
  <div className="form-group-inner my-2">
  <label htmlFor="moduleImage" className="labeltext">Learner Outcomes</label>
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
        <TextField {...params}  placeholder="Select Learner Outcomes" />
      )}
    />
  </div>
</div>

<div className="form-group">
  <div className="form-group-inner my-2">
  <label htmlFor="moduleImage" className="labeltext">Learner Group</label>
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
        <TextField {...params}  placeholder="Select Learner Group" />
      )}
    />
  </div>
</div>
</form>
       

        <button onClick={handleUpdateModule} className="updatebtn">
          Update Module
        </button>

    

        {/* New Section for Module Image Update */}
        

       
        {/* <button onClick={handleUpdateModuleImage} className="updatebtn">
          Update Module Image
        </button> */}
      </div>
    </div>
  );
}

export default ModuleUpdate;
