import Field from "./Field";
import React, { Component, useEffect} from "react"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';




const port = 5270;
const host = 'localhost';
const path = '/notifications';



class Fields extends Component {
    state = { 
        notifications: [],
        error: false,
        fetching: false,
        progress: 0
    }
    

    getNotifications = () => {
        if(this.state.fetching)
            return;
        this.setState({fetching: true});
        const Http = new XMLHttpRequest();
        const url= 'http://' + host  +':' + port + path;
        Http.open("GET", url);
        try{
            Http.send();
        } catch(error) {
            console.log("Connection error", error);
            this.setState({error: true, fetching: false});
            return;
        }
        Http.onreadystatechange = () => {
            if(Http.readyState === XMLHttpRequest.DONE) {
              var status = Http.status;
              console.log("the status is", status);
              if ((status >= 200 && status < 400)) {
                console.log(Http.responseText)
                this.setState({notifications: JSON.parse(Http.responseText), error: false});
              } else {
                console.log("Connection error");
                this.setState({error: true});
              }
            }
            this.setState({fetching: false});
        };
    }


    componentDidMount(){
        this.getNotifications();

        let tick = () => {
            // reset when reaching 100%
            this.setState({progress: this.state.progress >= 100 ? 0 : this.state.progress + 1});
        }
      
        this.timer = setInterval(tick, 20);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    
    useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
    }));
    
    CircularDeterminate = () => {
      const classes = {}
      return (
        <div className={classes.root}>
          <CircularProgress variant="determinate" value={this.state.progress} />
        </div>
      );
    }

    render() { 
        return (
            <div>
              <ul class="w3-ul w3-card-4">
                {this.state.notifications.map((notification)=> 
                <Field value = {notification} key = {'field #'+this.state.notifications.indexOf(notification)}/>)}
              </ul>
              <Button Style="position: relative; left:145px;" onClick={this.getNotifications} variant="contained" color="primary">Refresh</Button>
              {this.state.fetching && this.CircularDeterminate()}
              {this.state.error && <p>Could Not Connect to Server</p>}
            </div>

        );
    }
}
 
export default Fields;