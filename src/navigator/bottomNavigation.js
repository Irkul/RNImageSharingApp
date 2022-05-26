import React from "react";
import { Image, View, StyleSheet, Text, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
    HomeScreen,
    PostScreen,
    ProfileScreen,
} from '../screens';
import { PrimaryColors, Transparents } from "../theme/colors";
import {unitH, unitW} from "../theme/constant";

export default BottomNavigation = ({route}) => {
    const BottomTab = createBottomTabNavigator();
    const { selectedIndex } = route.params;
    const screens = [ 
        "HomeScreen",
        "PostScreen",
        "ProfileScreen",
    ];

    const pathToAsset = "../../assets/";
    
    const getTabBarVisibility = (route) => {
        // if(route.state === undefined) return true;
        // const routeName = route.state
        //   ? route.state.routes[route.state.index].name
        //   : "";
    
        // for (let screen of screens)
        //   if (routeName === screen) {
        //     return true;
        //   }
    
        // return false;
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOnScreens = ["EditProfile"];
        if (hideOnScreens.indexOf(routeName) > -1) return false;
        return true;
    };

    return (
        <BottomTab.Navigator
            initialRouteName={screens[selectedIndex]}
            screenOptions={{
                style: styles.bar_wrapper,
            }}
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: () => {
                        return;
                    },
                    tabBarIcon: ({ focused }) => {
                    if (focused)
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image_active}>
                                <Image
                                    source={require(`${pathToAsset}icons/collapses.png`)}
                                    style={{height: 20, width: 20}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Home</Text>
                            </View>
                        );
                    else
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image}>
                                <Image
                                    source={require(`${pathToAsset}icons/collapses.png`)}
                                    style={{height: 20, width: 20}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Home</Text>
                            </View>
                        );
                    },
                })}
            />
            <BottomTab.Screen
                name="PostScreen"
                component={PostScreen}
                options={({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: () => {
                        return;
                    },
                    tabBarIcon: ({ focused }) => {
                    if (focused)
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image_active}>
                                <Image
                                    source={require(`${pathToAsset}icons/purchase.png`)}
                                    style={{height: 20, width: 20}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Post</Text>
                            </View>
                        );
                    else
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image}>
                                <Image
                                    source={require(`${pathToAsset}icons/purchase.png`)}
                                    style={{height: 20, width: 20}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Post</Text>
                            </View>
                        );
                    },
                })}
            />
            <BottomTab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: () => {
                        return;
                    },
                    tabBarIcon: ({ focused }) => {
                    if (focused)
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image_active}>
                                <Image
                                    source={require(`${pathToAsset}icons/partners.png`)}
                                    style={{height: 20, width: 20}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Profile</Text>
                            </View>
                        );
                    else
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image}>
                                <Image
                                    source={require(`${pathToAsset}icons/partners.png`)}
                                    style={{height: 20, width: 20}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Profile</Text>
                            </View>
                        );
                    },
                })}
            />
        </BottomTab.Navigator> 
    )
}

const styles = StyleSheet.create({
    bar_wrapper:{
        position:'absolute',
        overflow: 'hidden',
        height: 120,
        borderColor: 'transparent',
        backgroundColor: Transparents.BlueColor,
    },
    tab_text:{
        marginBottom: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: '#000'
    },
    icon_wrapper:{
        marginTop: 10,
        height: 80,
        width: '67%'
    },
    main_navigation: {
        alignItems: 'center',
    },
    main_navigation_image: {
        width: 30,
        height: 30,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: Transparents.SandColor,
        justifyContent: "center",
        marginBottom: 5,
    },
    main_navigation_image_active: {
        width: 30,
        height: 30,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: PrimaryColors.Blue,
        justifyContent: "center",
        marginBottom: 5,
    },
    main_navigation_text: {
        fontSize: 10,
        fontWeight: 'bold',
    },
});