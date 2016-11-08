import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import Event from './Event.jsx';
const StyleLink = Radium(Link);

@Radium
class TimeLineSection extends Component {
  render() {
    let dots = [];
    for(let i = 0; i < this.props.totalsMonth / 10; i++) {
      dots.push(<span key={i} style={[styles.dotRight, styles.dot]}></span>);
    }

    const people = this.props.people.map((d) => {
      let mainCategory;
      let order;

      if(d.categories.indexOf('Militair') !== -1) {
        mainCategory = 'Militair';
        order = 1;
      } else if(d.categories.indexOf('Verzet') !== -1) {
        mainCategory = 'Verzet';
        order = 2;
      } else if(d.categories.indexOf('Sjoa') !== -1) {
        mainCategory = 'Sjoa';
        order = 3;
      } else {
        mainCategory = '';
        order = 4;
      }

      return {
        ...d,
        mainCategory,
        order
      };
    }).sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));

    return(
      <li style={styles.container}>
        <div style={styles.event}></div>
        <div style={styles.dotsSection}>
          {people.map((d, i) => {
            const dotStyles = [styles.dotLeft, styles.dot];
            if(d.mainCategory === 'Militair') dotStyles.push(styles.greenDot);
            if(d.mainCategory === 'Verzet') dotStyles.push(styles.orangeDot);
            if(d.mainCategory === 'Sjoa') dotStyles.push(styles.blueDot);
            return <StyleLink key={i} to={'persoon/' + d.id}><span style={dotStyles}></span></StyleLink>;
          })}
        </div>
        <div style={styles.labelContainer}><span>— {this.props.month} —</span></div>
        <div style={styles.dotsSection}>{dots}</div>
        <div style={styles.event}>
          {this.props.eventsMonth.map((d, i) => <Event key={i} data={d} />)}
        </div>
      </li>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'flex-start'
  },
  dotsSection: {
    flexBasis: 'calc(15% - 1em)',
    backgroundColor: '#363d41',
    padding: '1em',
    flexShrink: 0
  },
  labelContainer: {
    flexBasis: '10%',
    textAlign: 'center',
    color: '#9b9e9f',
    fontFamily: 'Nexa',
    textTransform: 'uppercase',
    padding: '1em'
  },
  dot: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, .8)',
    margin: '5px',
  },
  dotRight: {
    float: 'left',
  },
  dotLeft: {
    float: 'right'
  },
  greenDot: {
    backgroundColor: '#8fda62'
  },
  orangeDot: {
    backgroundColor: '#daab62'
  },
  blueDot: {
    backgroundColor: '#6e9fe9'
  },
  event: {
    flexBasis: '10%',
    flexShrink: 0,
    flexGrow: 1
  }
};

export default TimeLineSection;
