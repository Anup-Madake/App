import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {Colors} from "../constants/Colors";
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking'
import { useWarmUpBrowser} from "../hooks/useWarmUpBrowser";


WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen ({ navigation }) {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
            })

            // If sign in was successful, set the active session
            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {
                // Use signIn or signUp returned from startOAuthFlow
                // for next steps, such as MFA
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [])


    return (
        <View>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop:100,
            }}>
           <Image source={require('../assets/images/1.png')}
           style={{
               width: 250,
               height: 480,
               borderRadius:20,
               borderWidth: 3,
           }}
           />
            </View>
            <View style={
                styles.subContainer
            }>
                <Text style={{
                    color:'red',
                    fontSize:25,
                    fontFamily:'Nebula-Regular',
                    textAlign:'center',
                }}>LIGHT RAY <Text style={{
                    color: 'black',
                    fontFamily:'Nebula-Regular',
                }}>Think Next</Text></Text>
                <Text style={{
                    color:Colors.GREY,
                    fontFamily:'Nebula-Regular',
                    fontSize:10,
                    textAlign:'center',
                }}>
                    AR Glasses for Smart Mobility With Situational Intelligence

                </Text>

                <TouchableOpacity style={styles.btn}
                onPress={onPress}>
                    <Text style={{
                        fontFamily:'Nebula-Regular',
                        fontSize:20,
                    }}>Sign In</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#fff',
        padding:20,
        alignItems: 'center',
        marginTop:-35,
    },
    btn:{
        backgroundColor:"red",
        padding:20,
        borderRadius:99,
        borderWidth:1,
        marginTop:40,
        paddingHorizontal:100,

    }
})