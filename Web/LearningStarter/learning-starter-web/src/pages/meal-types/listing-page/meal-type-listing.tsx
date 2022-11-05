import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, MealTypeGetDto } from "../../../constants/types";
import {useHistory} from "react-router-dom";
import { routes } from "../../../routes/config";
import { GroupsButton, HomeButton, IngredientsButton, MealTypesButton, RecipesButton, ShoppingListsButton } from "../../../components/buttons/navigation-buttons";

export const MealTypeListingPage = () => {
    const [mealTypes, setMealTypes] = useState<MealTypeGetDto[]>();
    const history = useHistory();

    useEffect(() => {
        const fetchMealTypes = async() => {
        const response = await axios.get<ApiResponse<MealTypeGetDto[]>>(
                `${BaseUrl}/api/meal-types`
            );

            if(response.data.hasErrors){
                response.data.errors.forEach((err) => {
                    console.log(err.message);
                });
            } else {
                setMealTypes(response.data.data);
            }
        };

        fetchMealTypes();
    }, []);

    return (
        <Segment>
            {mealTypes && (
                <>
            <Header>Meal Types</Header>
            <Button type="button" onClick={() => history.push(routes.mealTypes.create)}>+ Create</Button>
            <Table striped celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {mealTypes.map((mealType) => {
                    return (
                    <Table.Row key={mealType.id}>
                    <Table.Cell>
                        <Icon
                            link
                            name="pencil"
                            onClick={() =>
                            history.push(
                                routes.mealTypes.update.replace(":id", `${mealType.id}`)
                            )
                        }
                        />
                    </Table.Cell>
                    <Table.Cell>{mealType.id}</Table.Cell>
                    <Table.Cell>{mealType.name}</Table.Cell>
                    <Table.Cell>
                        <Icon
                            link
                            name="trash"
                            onClick={() =>
                            history.push(
                                routes.mealTypes.delete.replace(":id", `${mealType.id}`)
                            )
                        }
                        />
                    </Table.Cell>
                    </Table.Row>
                    );
                })}
            </Table.Body>
            </Table>
                </>
            )}            
            <HomeButton></HomeButton>
            <GroupsButton></GroupsButton>
            <IngredientsButton></IngredientsButton>
            <ShoppingListsButton></ShoppingListsButton>
            <RecipesButton></RecipesButton>
            <MealTypesButton></MealTypesButton>
        </Segment>
    );
};