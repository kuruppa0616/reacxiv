import { Dimensions } from "react-native";
const window = Dimensions.get('window');
const Device = {
	Width: Math.floor(window.width),
	Height: Math.floor(window.height)
}

export default Device;