import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl);

const show = id => axios.get(`${baseUrl}/${id}`);

const create = object => axios.post(baseUrl, object);

const update = object => axios.put(`${baseUrl}/${object.id}`, object);

const deleteObject = id => axios.delete(`${baseUrl}/${id}`);

export default { getAll, show, create, update, deleteObject };
