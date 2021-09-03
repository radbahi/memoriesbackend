import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Pagination from "../Pagination/Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import "./tagstyle.css";

function useQuery() {
  //sets up url search params
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") })); // we use .join because we cant pass an array as a search param
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    //keyCode 13 is the enter key
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTagInput(value);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = tagInput.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setTagInput("");
    }

    if (
      key === "Backspace" &&
      !tagInput.length &&
      tags.length &&
      isKeyReleased
    ) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setTagInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <div className="tag-container">
                {tags.map((tag, index) => (
                  <div className="tag">
                    {tag}
                    <button onClick={() => deleteTag(index)}>X</button>
                  </div>
                ))}
                <input
                  value={tagInput}
                  placeholder="Enter a tag"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                />
              </div>
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
