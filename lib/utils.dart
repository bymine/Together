import 'package:intl/intl.dart';

String invitteMessage(String code) {
  switch (code) {
    case "already_in":
      return "이미 프로젝트 멤버 입니다";
    case "already_sent":
      return "이미 초대 메세지를 보냈습니다";
    case "not_leader":
      return "프로젝트의 리더만이 초대할 수 있습니다";
    case "self_invite":
      return "자기 자신을 초대할 수 없습니다";
    case "error":
      return "에러가 발생했습니다";
    case "success":
      return "초대메세지를 전송했습니다";
    default:
      return "";
  }
}

String svgIconAsset(String type) {
  type = type.toLowerCase();
  switch (type) {
    case "png":
      return "assets/svg_icon/png.svg";

    case "jpg":
      return "assets/svg_icon/jpg.svg";

    case "doc":
      return "assets/svg_icon/doc.svg";

    case "csv":
      return "assets/svg_icon/csv.svg";

    case "docx":
      return "assets/svg_icon/docx.svg";

    case "pptx":
      return "assets/svg_icon/pptx.svg";

    case "ppt":
      return "assets/svg_icon/ppt.svg";

    case "txt":
      return "assets/svg_icon/txt.svg";

    case "xls":
      return "assets/svg_icon/xls.svg";

    case "xlsx":
      return "assets/svg_icon/xlsx.svg";

    case "pdf":
      return "assets/svg_icon/pdf.svg";

    default:
      return "assets/svg_icon/default.svg";
  }
}

String mainAdressFormat(String mainAddr) {
  print(mainAddr);
  switch (mainAddr) {
    case "서울":
      return "서울특별시";
    case "부산":
      return "부산광역시";
    case "대구":
      return "대구광역시";
    case "인천":
      return "인천광역시";
    case "광주":
      return "광주광역시";
    case "대전":
      return "대전광역시";
    case "울산":
      return "울산광역시";
    case "경기":
      return "경기도";
    case "강원":
      return "강원도";
    case "충북":
      return "충청북도";
    case "충남":
      return "충청남도";
    case "전북":
      return "전라북도";
    case "전남":
      return "전라남도";
    case "경북":
      return "경상북도";
    case "경남":
      return "경상남도";
    case "세종":
      return "세종특별자치시";
    case "제주":
      return "제주특별자치도";

    default:
      return "";
  }
}

String addressToString(bool isMyaddress, String mainAddr, String referenceAddr,
    String detailAddr) {
  String address = isMyaddress == true
      ? mainAddr + " " + referenceAddr + " " + detailAddr
      : mainAddr + " " + referenceAddr;
  if (mainAddr == "#") {
    return address.replaceAll("# ", "");
  }
  if (referenceAddr == "#") return address.replaceAll("# ", "");

  return address;
}

String phoneNumerFormat(String phone) {
  String first;
  String second;
  String third;

  first = phone.substring(0, 3);

  if (phone.length == 10) {
    second = phone.substring(3, 6);
    third = phone.substring(6, 10);
  } else {
    second = phone.substring(3, 7);
    third = phone.substring(7, 11);
  }
  print(first + "-" + second + "-" + third);

  return first + "-" + second + "-" + third;
}

String toPhoneString(String number) {
  return number.replaceAll('-', '');
}

String durationFormatTime(Duration duration) {
  String twoDigits(int n) => n.toString().padLeft(2, "0");
  String twoDigitMinutes = twoDigits(duration.inMinutes.remainder(60));
  String twoDigitSeconds = twoDigits(duration.inSeconds.remainder(60));
  return "$twoDigitMinutes:$twoDigitSeconds";
}

String toDateTime(DateTime dateTime) {
  final date = DateFormat('yyyy년 M월 d일').format(dateTime);

  final time = DateFormat('HH:mm').format(dateTime);

  return '$date $time';
}

String toDate(DateTime dateTime) {
  final date = DateFormat('yyyy년 M월 d일').format(dateTime);

  return '$date';
}

String toTime(DateTime dateTime) {
  final time = DateFormat.Hm().format(dateTime);

  return '$time';
}

String toDateTimeISO(String iso) {
  DateTime dateTime = DateTime.parse(iso);
  final date = DateFormat('yyyy년 M월 d일').format(dateTime);
  final time = DateFormat('HH:mm').format(dateTime);

  return '$date $time';
}

String toDateISO(String iso) {
  DateTime dateTime = DateTime.parse(iso);
  final date = DateFormat('yyyy년 M월 d일').format(dateTime);

  return '$date';
}

String toDateDaysISO(String iso) {
  DateTime dateTime = DateTime.parse(iso);
  final date = DateFormat('yyyy년 M월 d일 E요일', 'ko-KR').format(dateTime);

  return '$date';
}

String toTimeISO(String iso) {
  DateTime dateTime = DateTime.parse(iso);
  final time = DateFormat.Hm().format(dateTime);

  return '$time';
}

String toAMPMTimeISO(String iso) {
  DateTime dateTime = DateTime.parse(iso);
  final time = DateFormat("a h시m분", "ko-KR").format(dateTime);

  return '$time';
}

String schdeuleDateFormat(String start, String end, bool isSameDay) {
  DateTime startTime = DateTime.parse(start);
  DateTime endTime = DateTime.parse(end);

  if (isSameDay) {
    final date = DateFormat(' M/d', 'ko-KR').format(startTime);

    return '$date';
  } else {
    final date = DateFormat(' M/d', 'ko-KR').format(startTime);
    final date2 = DateFormat(' M/d', 'ko-KR').format(endTime);

    return '$date ~ $date2';
  }
}

String schdeuleTimeFormat(String start, String end) {
  DateTime dateTime = DateTime.parse(start);
  DateTime dateTime2 = DateTime.parse(end);

  final date = DateFormat(
    'h:mm',
  ).format(dateTime);
  final date2 = DateFormat(
    'h:mm a',
  ).format(dateTime2);

  return '$date ~ $date2';
}

String projectEnumFormat(String value) {
  switch (value) {
    case "상":
      return "High";

    case "중":
      return "Mid";

    case "하":
      return "Low";

    case "설정 안함":
      return "Any";

    case "스터디":
      return "Study";

    case "대외활동":
      return "Out";

    case "교내활동":
      return "In";

    default:
      return "Any";
  }
}

String projectEnumFromServer(String value) {
  switch (value) {
    case "High":
      return "상";

    case "Mid":
      return "중";

    case "Low":
      return "하";

    case "Any":
      return "설정 안함";

    case "Study":
      return "스터디";

    case "Out":
      return "대외활동";

    case "In":
      return "교내활동";

    default:
      return "Any";
  }
}

int getHashCode(DateTime key) {
  return key.day * 1000000 + key.month * 10000 + key.year;
}

DateTime getDateTime(int hash) {
  int day = hash ~/ 1000000;
  int month = (hash % 1000000) ~/ 10000;
  int year = (hash % 1000000) % 10000;

  return DateTime(year, month, day);
}

int chekcSameTimeChat(String iso) {
  DateTime dateTime = DateTime.parse(iso);

  int hash = getHashCode(dateTime);
  return hash + dateTime.hour * 100 + dateTime.minute;
}

String licenseToString(String license1, String license2, String license3) {
  String string = "";
  string = license1 + "," + license2 + "," + license3;

  string = string.replaceAll(",,", ",");

  if (string[0] == ",") {
    string = string.substring(1, string.length);
  }
  if (string.length != 0 && string[string.length - 1] == ",") {
    string = string.substring(0, string.length - 1);
  }
  if (string.length == 0) string = "";
  return string;
}
