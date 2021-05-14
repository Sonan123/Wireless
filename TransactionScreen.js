import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
            this.state = {
                hasCameraPermissions:null,
                scanned:false,
                scannedData:'',
                buttonState:'normal',
            }
      
    }

    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted"
        })
    }

    handleBarCodeScanned=async({type, data})=>{
        this.setState({
            scanned:true,
            scannedData: data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        
        if(buttonState==="clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            
            )
        }
        else if(buttonState==="normal"){
            return(
                <View style={styles.container}>
                
                <Text style={styles.displayText}>{
                    hasCameraPermissions===true? this.state.scannedData:"Request camera Permission"
                }</Text>
                    <TouchableOpacity 
                    onPress={this.getCameraPermissions}
                    style={styles.scanButton}>
    
                        <Text style={styles.buttonText}>Scan QR code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
    }
}
const style=StyleSheet.create({
    container:{
        justifyContent:'center',
        flex: 1,
        alignItems: 'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'#2196F3',
        margin: 10,
        padding: 10
    },
    buttonText: {
        fontSize:20
    }
})