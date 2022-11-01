import axios from "axios";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, GroupGetDto } from "../../../constants/types";

export const GroupListingPage = () => {
    const [Groups, setGroup] = useState<GroupGetDto[]>();
    const fetchGroup = async() => {
        const response = await axios.get<ApiResponse<GroupGetDto[]>>(
            `${BaseUrl}/api/group`
            );
        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
            });
        } else {
            setGroup(response.data.data);
        }
    };

    useEffect(() => {
        fetchGroup();
    }, []);

    return (
        <>
            <div>
                {Groups ? ( 
                Groups.map(Group => {
                    return (
                        <Segment>
                            <div>Id: {Group.Id}</div>
                            <div>Name: {Group.Name}</div>
                            <div>Image: {Group.Image}</div>
                        </Segment>
                    );
                }) 
            ) : (
                <div>Loading</div>
            )}
        </div>
        </>
    );
};