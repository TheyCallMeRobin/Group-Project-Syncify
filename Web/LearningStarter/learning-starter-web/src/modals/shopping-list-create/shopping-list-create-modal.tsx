import "../../modals/modal.css";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Header, Input, Modal } from "semantic-ui-react";
import {
  ApiResponse,
  ShoppingListCreateDto,
  ShoppingListGetDto,
} from "../../constants/types";
import { BaseUrl } from "../../constants/env-cars";
import toast from "react-hot-toast";

function ShoppingListCreateModal() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const initialValues: ShoppingListCreateDto = {
    name: "",
  };

  const onSubmit = async (values: ShoppingListCreateDto) => {
    const response = await axios.post<ApiResponse<ShoppingListGetDto>>(
      `${BaseUrl}/api/shopping-lists`,
      values,
      {
        validateStatus: () => true,
      }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
        toast.error("Error has occured, please try again", {
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      });
    } else {
      setSecondOpen(true);
      toast.success("Shopping List item created", {
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Modal
          as={Form}
          onClose={() => setFirstOpen(false)}
          onOpen={() => setFirstOpen(true)}
          open={firstOpen}
          trigger={
            <Button onClick={() => setFirstOpen(true)}>
              Create Shopping List Item
            </Button>
          }
        >
          <Modal.Header>Add An Item To Your Shopping List!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Shopping List</Header>
              <div className="field-title">
                <label htmlFor="name">Item Name</label>
              </div>
              <div className="field-title">
                <Field id="name" name="name">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button
              type="button"
              content="Don't Add to List!"
              labelPosition="right"
              icon="thumbs down outline"
              negative
              onClick={() => setFirstOpen(false)}
            />
            <Button
              type="submit"
              content="Add to List!"
              labelPosition="right"
              icon="thumbs up outline"
              positive
            />
          </Modal.Actions>
          <Modal
            onCLose={() => setSecondOpen(false)}
            open={secondOpen}
            size="small"
          >
            <Modal.Header>Success!!!</Modal.Header>
            <Modal.Content>
              <p>
                You have successfully added an Item to your Shoppng List with
                Syncify. Please enjoy!!!
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                type="button"
                icon="hand rock outline"
                content="Shopping List Item Created"
                labelPosition="right"
                positive
                onClick={() => setFirstOpen(false)}
              />
            </Modal.Actions>
          </Modal>
        </Modal>
      </Formik>
    </>
  );
}

export default ShoppingListCreateModal;
