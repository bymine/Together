import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_countdown_timer/countdown.dart';
import 'package:flutter_countdown_timer/countdown_controller.dart';
import 'package:intl/intl.dart';
import 'package:together_android/componet/input_field.dart';
import 'package:together_android/componet/showDialog.dart';
import 'package:together_android/constant.dart';
import 'package:together_android/page/before_login/search_account_page.dart';
import 'package:together_android/page/before_login/sign_up_result_page.dart';

import 'package:together_android/service/api.dart';
import 'package:together_android/utils.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key}) : super(key: key);

  @override
  _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  TextEditingController signUpEmail = TextEditingController();
  TextEditingController signUpPassword1 = TextEditingController();
  TextEditingController signUpPassword2 = TextEditingController();
  TextEditingController signUpName = TextEditingController();
  TextEditingController signUpNickName = TextEditingController();
  TextEditingController signUpPhone = TextEditingController();
  TextEditingController signUpBirth = TextEditingController();
  TextEditingController emailAuthController = TextEditingController();
  TextEditingController phoneAuthController = TextEditingController();

  final signupKey = GlobalKey<FormState>();

  String emailFieldFlag = "not yet";
  String phoneFieldFlag = "not yet";
  String nicknameFlag = "not yet";

  bool isHidePw1 = true;
  bool isHidePw2 = true;

  ValueNotifier<String> emailCodeFlag = ValueNotifier<String>("not yet");
  ValueNotifier<String> phoneCodeFlag = ValueNotifier<String>("not yet");

  CountdownController emailTimerController =
      CountdownController(duration: Duration(seconds: 180), onEnd: () {});
  CountdownController phoneTimerController =
      CountdownController(duration: Duration(seconds: 180), onEnd: () {});

  DateTime _selectedDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      appBar: _appBar(context),
      body: Form(
        key: signupKey,
        child: Container(
          padding: EdgeInsets.only(
              left: width * 0.08, right: width * 0.08, bottom: height * 0.02),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Create Account", style: headingStyle),
                MyInputField(
                  title: "?????????",
                  hint: "Input your E-mail",
                  controller: signUpEmail,
                  type: TextInputType.emailAddress,
                  titleButton: ElevatedButton(
                    onPressed: () async {
                      getEmailAuthCodeFromServer(width);
                    },
                    style: elevatedStyle,
                    child: Text(emailFieldFlag != "permit"
                        ? "???????????? ??????"
                        : emailCodeFlag.value == "permit"
                            ? "?????? ??????"
                            : "?????????"),
                  ),
                  auth: authEmailField(
                      width, context, emailFieldFlag, emailCodeFlag.value),
                  onChanged: (value) {
                    setState(() {
                      emailFieldFlag = "changed";
                      emailCodeFlag.value = "not yet";
                      emailTimerController.stop();
                    });
                  },
                  validator: (value) {
                    if (value!.isEmpty)
                      return "Email??? ???????????????";
                    else if (emailFieldFlag == "changed")
                      return "???????????? ?????? ????????? ???????????????";
                    else if (emailFieldFlag == "duplication")
                      return "?????? ???????????? ????????? ?????????";
                  },
                ),
                MyInputField(
                  title: "????????????",
                  hint: "",
                  type: TextInputType.visiblePassword,
                  controller: signUpPassword1,
                  isHidePw: isHidePw1,
                  suffixIcon: IconButton(
                    onPressed: () {
                      setState(() {
                        isHidePw1 = !isHidePw1;
                      });
                    },
                    icon: Icon(
                      Icons.visibility,
                      color: Colors.grey,
                    ),
                  ),
                  validator: (value) {
                    if (value!.isEmpty) return "PassWord??? ???????????????";
                  },
                ),
                MyInputField(
                  title: "???????????? ??????",
                  hint: "",
                  type: TextInputType.visiblePassword,
                  controller: signUpPassword2,
                  isHidePw: isHidePw2,
                  suffixIcon: IconButton(
                    onPressed: () {
                      setState(() {
                        isHidePw2 = !isHidePw2;
                      });
                    },
                    icon: Icon(
                      Icons.visibility,
                      color: Colors.grey,
                    ),
                  ),
                  validator: (value) {
                    if (value!.isEmpty)
                      return "PassWord??? ???????????????";
                    else if (value != signUpPassword1.text)
                      return "??????????????? ???????????? ????????????";
                  },
                ),
                MyInputField(
                  title: "??????",
                  hint: "",
                  controller: signUpName,
                  validator: (value) {
                    if (value!.isEmpty) return "Input name";
                  },
                ),
                MyInputField(
                  title: "?????????",
                  hint: "",
                  controller: signUpNickName,
                  titleButton: ElevatedButton(
                    onPressed: () async {
                      var code = await togetherGetAPI(
                          "/user/validationNickname",
                          "?user_nickname=${signUpNickName.text}");

                      setState(() {
                        nicknameFlag = code.toString();
                      });

                      if (nicknameFlag == "duplication") {
                        showAlertDialog(context, Text("????????? ???????????? ??????"),
                            Text("???????????? ???????????? ?????? ???????????? ??????????????????"), [
                          TextButton(
                              style:
                                  TextButton.styleFrom(primary: Colors.black),
                              onPressed: () {
                                Navigator.of(context).pop();
                                Navigator.of(context).pushReplacement(
                                    (MaterialPageRoute(
                                        builder: (context) =>
                                            SearchAccountPage(type: "pw"))));
                              },
                              child: Text("???????????? ??????",
                                  style: TextStyle(fontSize: width * 0.048))),
                          TextButton(
                              style:
                                  TextButton.styleFrom(primary: Colors.black),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: Text("??????",
                                  style: TextStyle(fontSize: width * 0.048)))
                        ]);
                      }
                    },
                    style: elevatedStyle,
                    child: Text(nicknameFlag == "permit" ? "?????? ??????" : "?????? ??????"),
                  ),
                  onChanged: (value) {
                    nicknameFlag = "changed";
                  },
                  validator: (value) {
                    if (value!.isEmpty)
                      return "nickName??? ???????????????";
                    else if (nicknameFlag == "changed")
                      return "?????? ??????????????? ???????????????";
                    else if (nicknameFlag == "duplication")
                      return "?????? ???????????? ???????????? ?????????";
                  },
                ),
                MyInputField(
                  title: "????????????",
                  hint: "- ?????? ???????????????",
                  type: TextInputType.number,
                  controller: signUpPhone,
                  titleButton: ElevatedButton(
                    onPressed: () {
                      getPhoneAuthCodeFromServer(width);
                    },
                    style: elevatedStyle,
                    child: Text("?????? ??????"),
                  ),
                  onChanged: (value) {
                    setState(() {
                      phoneFieldFlag = "changed";
                      phoneCodeFlag.value = "not yet";
                      phoneTimerController.stop();
                    });
                  },
                  validator: (value) {
                    if (value!.isEmpty)
                      return "phone??? ???????????????";
                    else if (phoneFieldFlag == "changed")
                      return "???????????? ?????? ????????? ???????????????";
                    else if (phoneFieldFlag == "duplication")
                      return "?????? ???????????? ???????????? ?????????";
                  },
                  auth: authPhoneField(
                      width, context, phoneFieldFlag, phoneCodeFlag.value),
                ),
                MyInputField(
                  title: "??????",
                  hint: DateFormat.yMd().format(_selectedDate),
                  suffixIcon: IconButton(
                      onPressed: () {
                        _getBirthFromUser();
                      },
                      icon: Icon(
                        Icons.calendar_today_outlined,
                        color: Colors.grey,
                      )),
                ),
                SizedBox(
                  height: 20,
                ),
                _singUpButton(width, height, context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  getEmailAuthCodeFromServer(double width) async {
    emailAuthController.clear();
    emailCodeFlag.value = "not yet";
    emailTimerController.stop();

    var code = await togetherGetAPI(
        "/user/validationEmail", "?user_email=${signUpEmail.text}");

    setState(() {
      emailFieldFlag = code.toString();
    });
    print(emailFieldFlag);

    if (emailFieldFlag == "fail") {
      showAlertDialog(context, Text("????????? ?????? ??????"), Text("???????????? ???????????? ???????????? ????????????"), [
        Center(
          child: TextButton(
              style: TextButton.styleFrom(primary: Colors.black),
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text("??????", style: TextStyle(fontSize: width * 0.048))),
        )
      ]);
    } else if (emailFieldFlag == "duplication") {
      showAlertDialog(
          context, Text("????????? ?????? ??????"), Text("???????????? ???????????? ?????? ???????????? ??????????????????"), [
        TextButton(
            style: TextButton.styleFrom(primary: Colors.black),
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.of(context).pushReplacement((MaterialPageRoute(
                  builder: (context) => SearchAccountPage(type: "pw"))));
            },
            child: Text("???????????? ??????", style: TextStyle(fontSize: width * 0.048))),
        TextButton(
            style: TextButton.styleFrom(primary: Colors.black),
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: Text("??????", style: TextStyle(fontSize: width * 0.048)))
      ]);
    } else if (emailFieldFlag == "permit") {
      emailTimerController = CountdownController(
          duration: Duration(seconds: 180),
          onEnd: () {
            emailCodeFlag.value = "time over";
          });
      emailTimerController.start();
    }
  }

  getPhoneAuthCodeFromServer(double width) async {
    phoneAuthController.clear();
    phoneCodeFlag.value = "not yet";
    phoneTimerController.stop();
    var phone = phoneNumerFormat(signUpPhone.text);

    var code =
        await togetherGetAPI("/user/validationPhone", "?user_phone=$phone");
    setState(() {
      phoneFieldFlag = code.toString();
    });
    print(phoneFieldFlag);
    if (phoneFieldFlag == "fail") {
      showAlertDialog(
          context, Text("????????? ?????? ??????"), Text("???????????? ?????????????????? ???????????? ????????????"), [
        Center(
          child: TextButton(
              style: TextButton.styleFrom(primary: Colors.black),
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text("??????", style: TextStyle(fontSize: width * 0.048))),
        )
      ]);
    } else if (phoneFieldFlag == "duplication") {
      showAlertDialog(
          context, Text("???????????? ?????? ??????"), Text("???????????? ???????????? ????????? ?????? ???????????? ???????????????"), [
        TextButton(
            style: TextButton.styleFrom(primary: Colors.black),
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.of(context).pushReplacement((MaterialPageRoute(
                  builder: (context) => SearchAccountPage(type: "pw"))));
            },
            child: Text("???????????? ??????", style: TextStyle(fontSize: width * 0.048))),
        TextButton(
            style: TextButton.styleFrom(primary: Colors.black),
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: Text("??????", style: TextStyle(fontSize: width * 0.048)))
      ]);
    } else if (phoneFieldFlag == "permit") {
      phoneTimerController = CountdownController(
          duration: Duration(seconds: 180),
          onEnd: () {
            phoneCodeFlag.value = "time over";
          });
      phoneTimerController.start();
    }
  }

  authEmailField(
      double width, BuildContext context, String value, String authValue) {
    return Visibility(
      visible: value == "permit" && authValue != "permit",
      child: Container(
        padding: EdgeInsets.only(top: 10),
        child: Row(
          children: [
            Expanded(
              child: TextFormField(
                controller: emailAuthController,
                style: editSubTitleStyle,
                validator: (value) {
                  if (value!.isEmpty) return "Code ???????????????";
                },
                decoration: InputDecoration(
                  hintText: "Code",
                  hintStyle: editSubTitleStyle,
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.grey, width: 1)),
                ),
              ),
            ),
            SizedBox(
              width: width * 0.1,
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                ElevatedButton(
                  onPressed: () async {
                    var code = await togetherGetAPI(
                        '/user/checkDeviceValidation',
                        "?validation_code=${emailAuthController.text}&code_type=E&user_device=${signUpEmail.text}");

                    emailCodeFlag.value = code.toString();
                    print(emailCodeFlag.value);
                    if (emailCodeFlag.value == "permit") {
                      if (emailTimerController.isRunning)
                        emailTimerController.stop();
                    } else if (emailCodeFlag.value == "error") {
                      showAlertDialog(context, Text("????????? ?????? ??????"),
                          Text("???????????? ????????? ???????????? ????????????"), []);
                    }
                    setState(() {});
                  },
                  style: elevatedStyle,
                  child: Text("?????? ??????"),
                ),
                Visibility(
                  visible: emailTimerController.isRunning,
                  child: Countdown(
                    countdownController: emailTimerController,
                    builder: (_, Duration time) {
                      return Text(durationFormatTime(time));
                    },
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  authPhoneField(
      double width, BuildContext context, String value, String authValue) {
    return Visibility(
      visible: value == "permit" && authValue != "permit",
      child: Container(
        padding: EdgeInsets.only(top: 10),
        child: Row(
          children: [
            Expanded(
              child: TextFormField(
                controller: phoneAuthController,
                style: editSubTitleStyle,
                validator: (value) {
                  if (value!.isEmpty) return "Code ???????????????";
                },
                decoration: InputDecoration(
                  hintText: "Code",
                  hintStyle: editSubTitleStyle,
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.grey, width: 1)),
                ),
              ),
            ),
            SizedBox(
              width: width * 0.1,
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                ElevatedButton(
                  onPressed: () async {
                    print(phoneAuthController.text);
                    var phone = phoneNumerFormat(signUpPhone.text);

                    var code = await togetherGetAPI(
                        '/user/checkDeviceValidation',
                        "?validation_code=${phoneAuthController.text}&code_type=P&user_device=$phone");

                    phoneCodeFlag.value = code.toString();
                    print(phoneCodeFlag.value);
                    if (phoneCodeFlag.value == "permit") {
                      if (phoneTimerController.isRunning)
                        phoneTimerController.stop();
                    } else if (phoneCodeFlag.value == "error") {
                      showAlertDialog(context, Text("????????? ?????? ??????"),
                          Text("???????????? ????????? ???????????? ????????????"), []);
                    }
                    setState(() {});
                  },
                  style: elevatedStyle,
                  child: Text("?????? ??????"),
                ),
                Visibility(
                  visible: phoneTimerController.isRunning,
                  child: Countdown(
                    countdownController: phoneTimerController,
                    builder: (_, Duration time) {
                      return Text(durationFormatTime(time));
                    },
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  _singUpButton(double width, double height, BuildContext context) {
    return Container(
      width: width,
      height: height * 0.08,
      child: ElevatedButton(
        style: elevatedStyle,
        onPressed: () async {
          if (signupKey.currentState!.validate()) {
            var statusCode = await togetherPostAPI(
                "/user/join",
                jsonEncode({
                  "user_email": signUpEmail.text,
                  "user_pw": signUpPassword1.text,
                  "user_name": signUpName.text,
                  "user_phone": phoneNumerFormat(signUpPhone.text),
                  "user_nickname": signUpNickName.text,
                  "user_birth": _selectedDate.toIso8601String(),
                  "user_age": (DateTime.now().year - _selectedDate.year + 1),
                }));

            if (statusCode == 200) {
              Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => SignUpResultPage()));
            }
          }
        },
        child: Text(
          'Create Account',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }

  _getBirthFromUser() async {
    DateTime? _pickerDate = await showDatePicker(
        context: context,
        initialDate: DateTime.now(),
        firstDate: DateTime(1980),
        lastDate: DateTime(2022));

    if (_pickerDate != null) {
      setState(() {
        _selectedDate = _pickerDate;
      });
    }
  }

  AppBar _appBar(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      leading: GestureDetector(
        onTap: () {
          Navigator.of(context).pop();
        },
        child: Icon(
          Icons.arrow_back_ios,
          size: 20,
          color: Colors.black,
        ),
      ),
      actions: [
        Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(width: 2, color: Colors.grey),
            ),
            child: Icon(
              Icons.person,
              color: Colors.grey,
              size: 20,
            )),
        SizedBox(
          width: 20,
        )
      ],
    );
  }
}
