import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  FormControl,
} from "@mui/material";
import PostCard from "../../Components/Main Admin/PostCard";
// import DateSelector from "../../Components/Main Admin/DateSelector";
import Search from "../../Components/Search";
import { useDispatch, useSelector } from "react-redux";
import { getLatsPosts, searchPost } from "../../APIS/adminAPI";
import { setPosts } from "../../slice/admin";
import { setError } from "../../slice/user";
import Topbar from "../../Components/Restaurant/Topbar";

export default function Posts() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const posts = useSelector((state) => state.admin.posts);
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const res = await getLatsPosts(id);
      console.log(res);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        dispatch(setPosts(data));
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403 || status === 500) {
          dispatch(setError(message));
        }
      }
    }
    fetchData();
  }, []);
  console.log(searchText);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
        const res = await searchPost(
          id,
          {
            type: selectedCategory,
            studentId: searchText,
          },
          { signal }
        );

        console.log(res);

        let { status } = res;
        if (status === 200) {
          const { data } = res;
          dispatch(setPosts(data));
        } else {
          status = res.response.status;
          const {
            response: {
              data: { message },
            },
          } = res;

          if (status === 401 || status === 403 || status === 500) {
            dispatch(setError(message));
          }
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error during fetch", error);
        }
      }
    }

    fetchData();

    return () => {
      abortController.abort(); // Abort the fetch when the component unmounts
    };
  }, [selectedCategory, searchText]);

  return (
    <Box height="90%" sx={{ overflowY: "scroll", pt: 1 }}>
      <Topbar>
        <Box display="flex" flexDirection="row">
          <Search
            value={searchText}
            setValue={(event) => {
              console.log("Setting searchText:", event.target.value);
              setSearchText(event.target.value);
            }}
          />
          <FormControl sx={{ width: "250px", ml: 2 }}>
            <InputLabel id={`category`}>Get posts</InputLabel>
            <Select
              labelId={`category`}
              id={`category`}
              label={`Category`}
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Reported">Reported</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Topbar>
      <Box sx={{ ml: 2, mb: 2, display: "flex", flexDirection: "row" }}>
        {/* <Box ml={1}>
          <DateSelector label="Posted On" value={date} setValue={setDate} />
        </Box> */}
      </Box>

      {posts && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pr: 3,
          }}
        >
          {posts.map((post) => (
            <PostCard data={post} key={post.id} />
          ))}
        </Box>
      )}
    </Box>
  );
}
