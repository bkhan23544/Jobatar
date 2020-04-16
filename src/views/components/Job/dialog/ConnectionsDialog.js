import React, { useEffect, useState } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";

import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    DialogContent,
    DialogActions,
    Button,
    Checkbox,
    TextField,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import { itemService } from "../../../../common/services";


const ConnectionsDialog = (props) => {

    const [checked, setChecked] = useState([]);
    const [search, setSearch] = useState('');
    const [connections, setConnections] = useState([]);

    const { onClose, open, connection, takingData } = props;
    let connectionList = connection && connection.data && connection.data.items;

    const listOfConnection = new Set();
    useEffect(() => {
        // Your code here
        //props && Object.getOwnPropertyNames(props.connection).length === 0 && props.dispatch(userActions.connection("GET", null, { key:"my-connections", status:1 }));

        itemService.inviteMember("GET", null).then(data => {
            setConnections(data.items);
            takingData(data.items)
        });

        setChecked((props && props.selected) ? props.selected : []);

    }, [connectionList]);

    function handleClose() {
        onClose();
    }

    function handleChange(e, value) {
        listOfConnection.has(e.target.value) ? listOfConnection.delete(e.target.value) : listOfConnection.add(e.target.value);
    }

    function handleOk() {
        checked ? onClose(checked) : onClose();
    }

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const onSubmit = () => {
        itemService.inviteMember("GET", null, { q: search }).then(data => {
            setConnections(data.items);
            setChecked(checked);
        });
    };

    console.log("connections:", connections);
    // console.log("function:", takingData);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth={true}
            maxWidth={'sm'}
            className="offer-dialog connection-dialog">
            <DialogTitle id="simple-dialog-title">
                Select members from your connection
                {/*<Fab color="inherit" onClick={handleClose}>*/}
                {/*<i className="fas fa-times"></i>*/}
                {/*</Fab>*/}
            </DialogTitle>
            <DialogContent dividers className={''}>
                <div className="peple-search">
                    <div className="input-group flex-nowrap">
                        <TextField
                            id="outlined-bare"
                            defaultValue=""
                            margin="normal"
                            placeholder="Select Members"
                            variant="outlined"
                            inputProps={{ 'aria-label': 'bare', 'className': 'pl-3' }}
                            onChange={e => setSearch(e.target.value)}
                            className={'w-100'}
                        />
                        <div className="input-group-prepend">
                            <button className="btn" type="button" onClick={onSubmit}><SearchIcon /></button>
                        </div>
                    </div>
                </div>
                <List style={{ marginLeft: '-24px', marginRight: '-24px' }} dense>
                    {connections && connections.map((item) => {
                        return (
                            <ListItem key={Math.random()} button>
                                <ListItemAvatar style={{ marginLeft: '10px' }}>
                                    <Avatar alt={item.name} src={item.avatar} />
                                </ListItemAvatar>
                                <ListItemText id={item.id} primary={item.name} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(item.id)}
                                        checked={checked.indexOf(item.id) !== -1}
                                        inputProps={{ 'aria-labelledby': item.id }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                    )}
                    {(connections && connections.length === 0) && <div className="p-3 text-center">Connections not found</div>}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleOk} color="primary">Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

const connectionSelector = createSelector(
    state => state.connection,
    connection => connection
);

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    connectionSelector,
    (process, connection) => ({
        process, connection
    })
);

export default connect(mapStateToProps)(ConnectionsDialog);
