import {
  Button,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import { InputProps } from "@material-ui/core/Input"
import React, { Component, createRef } from "react"
import { connect } from "react-redux"
import { addItem, addReview, changeOrder, remove } from "../store/edit/actions"
import ItemContainer from "./ItemContainer"
import PeerReviewCollectionContainer from "./PeerReviewCollectionContainer"

class TabContainer extends Component<any, any> {
  private itemTypes = [
    "checkbox",
    "essay",
    "feedback",
    "open",
    "multiple-choice",
    "research-agreement",
    "scale",
  ]

  private reviewTypes = ["essay", "grade"]

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      menuAnchor: null,
      preExisting: null,
      scrollTo: null,
    }
  }

  public scrollToNewItem = (itemComponent: HTMLInputElement) => {
    if (itemComponent) {
      this.setState({
        scrollTo: itemComponent,
      })
    }
  }

  public componentDidUpdate() {
    if (this.state.scrollTo) {
      this.state.scrollTo.focus()
      this.state.scrollTo.select()
      this.setState({
        scrollTo: null,
      })
    }
  }

  public shouldComponentUpdate(nextProps, nextState) {
    if (this.state.preExisting) {
      return true
    }

    if (this.state.scrollTo) {
      return true
    }

    if (
      this.state.menuOpen !== nextState.menuOpen ||
      (this.state.menuAnchor && nextState.menuAnchor)
    ) {
      return true
    }

    return this.props !== nextProps
  }

  public render() {
    return (
      <div>
        <div style={{ marginTop: 0 }}>
          <TextField
            onChange={this.props.handleChange(
              `texts[${this.props.textIndex}].title`,
            )}
            label="title"
            value={this.props.text.title}
            margin="normal"
            fullWidth={true}
            multiline={true}
          />
          <TextField
            onChange={this.props.handleChange(
              `texts[${this.props.textIndex}].body`,
            )}
            label="body"
            value={this.props.text.body}
            margin="normal"
            fullWidth={true}
            multiline={true}
            rowsMax="10"
          />
          {this.props.items.find(item => item.type === "essay") ? (
            <TextField
              onChange={this.props.handleChange(
                `texts[${this.props.submitMessage}].submitMessage`,
              )}
              label="submit message"
              value={this.props.text.submitMessage}
              margin="normal"
              fullWidth={true}
              multiline={true}
              rowsMax="10"
            />
          ) : (
            <p />
          )}
        </div>
        <div style={{ marginTop: 50 }}>
          <Paper style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
              Items / Question types:
            </Typography>
            <ItemContainer
              onSortEnd={this.onSortEnd}
              items={this.props.items}
              handleChange={this.props.handleChange}
              useDragHandle={true}
              handleSort={this.onSortEnd}
              remove={this.remove}
              scrollToNew={this.scrollToNewItem}
            />

            <Button id="item" onClick={this.handleMenu}>
              Add item
            </Button>
            <Menu
              anchorEl={this.state.menuAnchor}
              open={this.state.menuOpen === "item"}
              onClose={this.handleMenu}
            >
              {this.itemTypes.map(type => (
                <MenuItem key={type} value={type} onClick={this.addItem(type)}>
                  {type}
                </MenuItem>
              ))}
            </Menu>
          </Paper>
          {this.props.items.find(item => item.type === "essay") ? (
            <Paper style={{ padding: 30 }}>
              <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
                Peer reviews:
              </Typography>
              <PeerReviewCollectionContainer
                peerReviewCollections={this.props.peerReviewCollections}
                handleChange={this.props.handleChange}
                handleSort={this.onSortEnd}
                useDragHandle={true}
                remove={this.remove}
              />
              <Button id="review" onClick={this.addReview}>
                Add review
              </Button>
            </Paper>
          ) : (
            <p />
          )}
        </div>
      </div>
    )
  }

  private addItem = type => event => {
    const existingAtStart = this.state.existing

    this.setState({
      preExisting: this.props.storeItems.map(qi => qi.id),
    })

    this.setState({
      menuOpen: null,
    })
    this.props.addItem(type)
  }

  private addReview = event => {
    this.setState({
      menuOpen: null,
    })
    this.props.addReview()
  }

  private remove = (path, index) => event => {
    this.props.remove(path, index)
  }

  private handleMenu = event => {
    this.setState({
      menuOpen: event.currentTarget.id,
      menuAnchor: event.currentTarget,
    })
  }

  private onSortEnd = ({ oldIndex, newIndex, collection }) => {
    this.props.changeOrder(collection, oldIndex, newIndex)
  }
}

const mapStateToProps = (state: any) => {
  return {
    storeItems: state.edit.items,
  }
}

const mapDispatchToProps = {
  addItem,
  addReview,
  changeOrder,
  remove,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabContainer)
