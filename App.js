/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NativeModules, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
const Logs = NativeModules.Logs;
const { height } = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {
	constructor() {
		super();

		this.state = { logsCount: 0, isSendLog: false };
		this.animY1 = new Animated.Value(0);
		this.animY2 = new Animated.Value(0);
		this.animY3 = new Animated.Value(0);
		this.animY4 = new Animated.Value(0);
		this.animY5 = new Animated.Value(0);
		this.animY6 = new Animated.Value(0);

		this.log = '';
	}
	
	componentDidMount() {
		function animLoop(anim, delay) {
			Animated.loop(
			Animated.sequence([
				Animated.timing(anim, {
					toValue: height - 50,
					duration: 3000,
					delay,
				}),
				Animated.timing(anim, {
					toValue: 0,
					duration: 3000,
				}),
			])
		).start();
		}
		animLoop(this.animY1, 0);
		animLoop(this.animY2, 100);
		animLoop(this.animY3, 200);
		animLoop(this.animY4, 300);
		animLoop(this.animY5, 400);
		animLoop(this.animY6, 500);
	}

	toggleLogLoop = () => {
		if (this.state.isSendLog) {
			this.setState({ isSendLog: false });
			this.log = '';
			return;
		}
		const logsLoop = () => {
			if (!this.state.isSendLog) return;
			this.log = this.log + makeid();
			Logs.send(this.log);
			this.setState({ logsCount: this.state.logsCount + 1 });
			requestIdleCallback(logsLoop);
		};
		this.setState({ isSendLog: true }, logsLoop);
	}
	
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>Logs count: {this.state.logsCount}</Text>
				<TouchableWithoutFeedback onPress={this.toggleLogLoop}>
					<Text>
						{this.state.isSendLog ? 'Stop logs' : 'Run logs'}
					</Text>
				</TouchableWithoutFeedback>
				<Animated.View style={[styles.ball, { backgroundColor: 'red'}, {transform: [{translateX: 0}, {translateY: this.animY1}]}]}/>
				<Animated.View style={[styles.ball, { backgroundColor: 'blue'}, {transform: [{translateX: 70}, {translateY: this.animY2}]}]}/>
				<Animated.View style={[styles.ball, { backgroundColor: 'yellow'}, {transform: [{translateX: 140}, {translateY: this.animY3}]}]}/>
				<Animated.View style={[styles.ball, { backgroundColor: 'white'}, {transform: [{translateX: 210}, {translateY: this.animY4}]}]}/>
				<Animated.View style={[styles.ball, { backgroundColor: 'black'}, {transform: [{translateX: 280}, {translateY: this.animY5}]}]}/>
				<Animated.View style={[styles.ball, { backgroundColor: 'purple'}, {transform: [{translateX: 350}, {translateY: this.animY6}]}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
	ball: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 50,
		height: 50,
		borderRadius: 25,
	}
});
