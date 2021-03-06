import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:juso/juso.dart';
import 'package:together_android/componet/button.dart';
import 'package:together_android/componet/input_field.dart';
import 'package:together_android/constant.dart';
import 'package:together_android/model/after_login_model/hobby_model.dart';
import 'package:together_android/page/after_login/profile/user_address_page.dart';
import 'package:together_android/service/api.dart';
import 'package:together_android/utils.dart';

class ConditionSearchPage extends StatefulWidget {
  const ConditionSearchPage({Key? key}) : super(key: key);

  @override
  _ConditionSearchPageState createState() => _ConditionSearchPageState();
}

class _ConditionSearchPageState extends State<ConditionSearchPage> {
  TextEditingController licenseController1 = TextEditingController();
  TextEditingController licenseController2 = TextEditingController();

  TextEditingController licenseController3 = TextEditingController();

  List<String> _selectedLicense = [];
  RangeValues _currentRangeValues = RangeValues(10, 50);

  List<String> tagName = [];
  List<String> categoryName = [];
  List<String> categoryIdx = [];
  List<String> tagIdx = [];
  List<String> containTag = [];

  List<String> myTag = [];
  List<String> postTagIdx = [];
  Map mappingIdx = Map<String, String>();
  Map mappingName = Map<String, String>();
  Map mappingTag = Map<String, String>();
  String selectedCategory = "게임";
  String selectedTag = "롤";
  String selectedAddress = "";
  Juso? conditionJuso;
  bool isSave = false;
  @override
  void initState() {
    super.initState();

    Future<List<FetchHobby>> future = fetchHobbyData();

    future.then((value) {
      value.forEach((element) {
        if (categoryName.contains(element.hobbyName.keys.first) == false) {
          categoryName.add(element.hobbyName.keys.first.toString());
          categoryIdx.add(element.hobbyIdx.keys.first);
        }
        if (tagName.contains(element.hobbyName.values.first) == false) {
          tagName.add(element.hobbyName.values.first.toString());
          tagIdx.add(element.hobbyIdx.values.first);
        }

        element.hobbyIdx.forEach((key, value) {
          mappingIdx[value] = key;
        });

        element.hobbyName.forEach((key, value) {
          mappingName[value] = key;
        });
      });

      tagIdx.forEach((element) {
        int i = tagIdx.indexOf(element);
        mappingTag[tagName[i]] = element;
      });
      selectedCategory = categoryName[0];
      selectedTag = tagName[0];
    });
  }

  Future<List<FetchHobby>> fetchHobbyData() async {
    return await togetherGetAPI("/user/edit_hobby", "");
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: _appBar(context),
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.only(
              left: width * 0.08,
              right: width * 0.08,
              bottom: height * 0.02,
              top: height * 0.02),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("팀원 조건 검색", style: headingStyle),
                      SizedBox(
                        height: 10,
                      ),
                      Row(
                        children: [
                          SizedBox(
                            width: 24,
                            height: 24,
                            child: Checkbox(
                                materialTapTargetSize:
                                    MaterialTapTargetSize.shrinkWrap,
                                value: isSave,
                                onChanged: (value) {
                                  setState(() {
                                    isSave = value!;
                                  });
                                }),
                          ),
                          Text(
                            "Save",
                            style: editTitleStyle,
                          )
                        ],
                      )
                    ],
                  ),
                  MyButton(
                      label: "Apply",
                      onTap: () async {
                        myTag.forEach((element) {
                          postTagIdx.add(mappingTag[element].toString());
                        });

                        if (licenseController1.text.isNotEmpty)
                          _selectedLicense.add(licenseController1.text);
                        if (licenseController2.text.isNotEmpty)
                          _selectedLicense.add(licenseController2.text);
                        if (licenseController3.text.isNotEmpty)
                          _selectedLicense.add(licenseController3.text);

                        Navigator.of(context).pop(jsonEncode({
                          "min_age": _currentRangeValues.start.toInt(),
                          "max_age": _currentRangeValues.end.toInt(),
                          "license": _selectedLicense,
                          "main_addr": conditionJuso == null
                              ? ""
                              : mainAdressFormat(
                                  jusoToFormat(conditionJuso!, "main")),
                          "reference_addr": conditionJuso == null
                              ? ""
                              : jusoToFormat(conditionJuso!, "refer"),
                          "detail_addr": "",
                          "hobby_small_idx": postTagIdx,
                          "save": isSave
                        }));
                      })
                ],
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                "나이",
                style: editTitleStyle,
              ),
              SizedBox(
                height: 10,
              ),
              RangeSlider(
                min: 10,
                max: 50,
                divisions: 30,
                activeColor: Colors.blueGrey,
                values: _currentRangeValues,
                labels: RangeLabels(
                  _currentRangeValues.start.round().toString(),
                  _currentRangeValues.end.round().toString(),
                ),
                onChanged: (RangeValues values) {
                  setState(() {
                    _currentRangeValues = values;
                  });
                },
              ),
              MyInputField(
                title: "자격증1",
                hint: "Input license1",
                controller: licenseController1,
              ),
              MyInputField(
                title: "자격증2",
                hint: "Input license2",
                controller: licenseController2,
              ),
              MyInputField(
                  title: "자격증3",
                  hint: "Input license3",
                  controller: licenseController3),
              MyInputField(
                title: "취미 (${myTag.length}/3)",
                hint:
                    myTag.toString().substring(1, myTag.toString().length - 1),
                suffixIcon: IconButton(
                  onPressed: () {
                    tagBottomsheet(context, width, height)
                        .then((value) => setState(() {}));
                  },
                  icon: Icon(
                    Icons.tag,
                    color: Colors.grey,
                  ),
                ),
              ),
              MyInputField(
                title: "주소",
                hint: selectedAddress,
                suffixIcon: IconButton(
                  onPressed: () async {
                    final juso = await Navigator.push<Juso?>(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const JusoScreen(),
                      ),
                    );

                    if (juso != null) {
                      setState(() {
                        conditionJuso = juso;
                        selectedAddress = conditionJuso!.address;
                      });
                    }
                  },
                  icon: Icon(
                    Icons.location_on,
                    color: Colors.grey,
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  String jusoToFormat(Juso juso, String type) {
    switch (type) {
      case "main":
        return juso.sido;

      case "refer":
        return juso.sigungu;

      case "detail":
        return juso.address.split(juso.sigungu).last;

      case "all":
        return juso.address;

      default:
        return "";
    }
  }

  // jusoToFormat(Juso juso, MyProfileDetail profile) {
  //   profile.mainAddr = mainAdressFormat(juso.sido);

  //   profile.referenceAddr = juso.sigungu;
  //   profile.detailAddr = juso.address.split(juso.sigungu).last;
  //   profile.postNum = juso.zonecode;

  //   print("detail_addr: " + juso.sido);
  //   print("reference_addr: " + juso.sigungu);
  //   print("main_addr: " + juso.address.split(juso.sigungu).last);
  // }

  tagBottomsheet(BuildContext context, double width, double height) {
    containTag = [];
    mappingName.keys.forEach((element) {
      if (mappingName[element] == selectedCategory) containTag.add(element);
    });

    selectedTag = containTag[0];
    return showModalBottomSheet(
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
                topLeft: Radius.circular(16), topRight: Radius.circular(16))),
        context: context,
        builder: (context) {
          return StatefulBuilder(builder: (context, setState) {
            return Container(
              padding: EdgeInsets.only(
                  left: width * 0.08,
                  right: width * 0.08,
                  top: height * 0.02,
                  bottom: height * 0.02),
              child: Wrap(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "Select Hobby",
                            style: headingStyle,
                          ),
                          MyButton(
                              label: "+ Add",
                              onTap: () {
                                setState(() {
                                  if (myTag.contains(selectedTag) == false)
                                    myTag.add(selectedTag);
                                });
                                Navigator.of(context).pop();
                              }),
                        ],
                      ),
                      MyInputField(
                        title: "Select Category",
                        hint: selectedCategory,
                        suffixIcon: DropdownButton(
                          dropdownColor: Colors.blueGrey,
                          underline: Container(),
                          value: selectedCategory,
                          items: categoryName.map((value) {
                            return DropdownMenuItem(
                                value: value,
                                child: Padding(
                                  padding: const EdgeInsets.only(
                                    left: 14,
                                  ),
                                  child: Text(value,
                                      style: editSubTitleStyle.copyWith(
                                          color: Colors.white)),
                                ));
                          }).toList(),
                          onChanged: (value) {
                            setState(() {
                              selectedCategory = value.toString();

                              containTag = [];
                              mappingName.keys.forEach((element) {
                                if (mappingName[element] == selectedCategory)
                                  containTag.add(element);
                              });
                              selectedTag = containTag[0];
                            });
                          },
                        ),
                      ),
                      MyInputField(
                        title: "Select Tag",
                        hint: selectedTag,
                        suffixIcon: DropdownButton(
                          dropdownColor: Colors.blueGrey,
                          underline: Container(),
                          value: selectedTag,
                          items: containTag.map((value) {
                            return DropdownMenuItem(
                                value: value,
                                child: Padding(
                                  padding: const EdgeInsets.only(
                                    left: 14,
                                  ),
                                  child: Text(value,
                                      style: editSubTitleStyle.copyWith(
                                          color: Colors.white)),
                                ));
                          }).toList(),
                          onChanged: (value) {
                            setState(() {
                              selectedTag = value.toString();
                            });
                          },
                        ),
                      )
                    ],
                  )
                ],
              ),
            );
          });
        });
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
            ),
            child: Icon(
              Icons.help_outline,
              color: Colors.grey,
              size: 24,
            )),
        SizedBox(
          width: 20,
        )
      ],
    );
  }
}
