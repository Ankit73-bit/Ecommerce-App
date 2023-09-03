import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [auth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/v1/category/`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.status === "success") {
        toast.success(`${name} is created.`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong on input form!");
    }
  };

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/`);

      if (data.status === "success") {
        setCategories(data.data.category);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Updating category name
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `/api/v1/category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.status === "success") {
        toast.success(`${updatedName} is updated.`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Can't update the category name.");
    }
  };

  // Deleting category name
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.status === "success") {
        toast.success(`Category is deleted.`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Can't delete the category!");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <>
                      <tr>
                        <td key={cat._id}>{cat.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-3"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(cat.name);
                              setSelected(cat);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-3"
                            onClick={() => handleDelete(cat._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
