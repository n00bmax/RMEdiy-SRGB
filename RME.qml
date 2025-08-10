import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15

Item {
    anchors.fill: parent

    Column {
        anchors.fill: parent
        anchors.margins: 20
        spacing: 15

        Text {
            color: "#FFFFFF"
            text: "Colordrop - Canvas Forward"
            font.pixelSize: 20
            font.family: "Poppins"
            font.bold: true
        }

        Text {
            color: "#FFFFFF"
            text: "This addon is used to send color information to LianLi software, so that it can be used to create looping animations for LianLi's wireless fan series. A 20x20 pixel matrix is sent to 127.0.0.1:61447."
            font.pixelSize: 12
            font.family: "Montserrat"
            wrapMode: Text.WordWrap
        }

        Repeater {
            model: service.controllers

            delegate: Item {
                width: 300
                height: 250

                Rectangle {
                    anchors.fill: parent
                    color: "#FFFFFF"
                    radius: 5
                }

                Image {
                    id: logo
                    x: 10
                    y: 10
                    height: 80
                    source: "https://assets.signalrgb.com/partners/lian-li/logo.png"
                    fillMode: Image.PreserveAspectFit
                    antialiasing: true
                    mipmap: true
                }

                Column {
                    x: 10
                    y: 100
                    width: parent.width - 20
                    spacing: 10

                    Text {
                        color: "#000000"
                        text: model.modelData.obj.name
                        font.pixelSize: 20
                        font.family: "Poppins"
                        font.bold: true
                    }
                }
            }
        }
    }
}
