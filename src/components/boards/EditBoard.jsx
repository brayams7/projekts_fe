import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { LIST_MANE_GRADIENTS_COLORS_ITEMS } from "/src/utils/contants/colorsHex.js";
import { useSelector } from "react-redux";
import { useGetAllWorkspacesUserQuery } from "/src/rtkQuery/apiSliceWorkspace.js";
import Button from "/src/components/utilsComponents/button/Button.jsx";

const EditBoard = ({ name: initialName, workspaceId, show, setShow }) =>
{
  const userId = useSelector((state) => state.auth.user.id);
  const { data: workspaces, isFetching, isError } = useGetAllWorkspacesUserQuery(userId);
  const [color, setColor] = useState("");
  const [name, setName] = useState(initialName);
  const [workspace, setWorkspace] = useState(workspaceId);

  if (isFetching) return <div>Cargando...</div>;
  if (isError) return <div>Ha ocurrido un error</div>;

  // noinspection JSValidateTypes
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      onShow={() =>
      {
        setColor("");
        setName(initialName);
        setWorkspace(workspaceId);
      }}
    >
      <Modal.Header>
        <span>Editar tablero</span>
      </Modal.Header>
      <Modal.Body>
        {/*<Form.Control type={"color"} />*/}
        {/*<div className="d-flex">
          {LIST_MANE_GRADIENTS_COLORS_ITEMS.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: item.backgroundColor, width: 100, height: 100
              }}
            >
            </div>
          ))}
        </div>*/}
        <Form.Group className={"mb-3"}>
          <Form.Label>Color</Form.Label>
          <Form.Control
            className={"w-100"}
            type={"color"}
            value={color}
            disabled={true}
          />
          <div className={"d-flex"}>
            {LIST_MANE_GRADIENTS_COLORS_ITEMS.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.backgroundColor, width: 100, height: 100
                }}
                onClick={() => setColor(item.backgroundColor)}
              >
              </div>
            ))}
          </div>
        </Form.Group>

        <Form.Group className={"mb-3"}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className={"mb-3"}>
          <Form.Label>Workspace</Form.Label>
          <Form.Control
            as="select"
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
          >
            <option value="">Selecciona un workspace</option>
            {workspaces.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-primary"
          onClick={() =>
          {
            setShow(false);
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBoard;
