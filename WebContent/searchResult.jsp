<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.*,java.util.*,javax.servlet.*,java.text.*,defult.*" %>
<%
String type = session.getAttribute("type").toString();
String[] displayINFO= new String[4];
String[] displayTITLE= new String[4];
String destination="";
int nowSpace = Integer.valueOf(session.getAttribute("result").toString());
int totalSpace = 0;
String datetime = session.getAttribute("datetime").toString();
if(type=="parkinglots"){
	parkinglotsInfoBean INFO = (parkinglotsInfoBean) session.getAttribute("info");
	displayINFO[0] = INFO.GETareaName();
	displayINFO[1] = INFO.GETparkName();
	displayINFO[2] = INFO.GETaddress();
	displayINFO[3] = INFO.GETpayGuide();
	displayTITLE[0] = "地區:";
	displayTITLE[1] = "停車場名稱:";
	displayTITLE[2] = "地址:";
	displayTITLE[3] = "收費資訊:";
	totalSpace = INFO.GETtotalSpace();
	destination=INFO.GETaddress();
}
else if(type=="roadsides"){
	roadsidesInfoBean INFO = (roadsidesInfoBean) session.getAttribute("info");
	displayINFO[0] = INFO.GETrd_name();
	displayINFO[1] = INFO.GETrd_begin();
	displayINFO[2] = INFO.GETrd_end();
	displayINFO[3] = INFO.GETtp_name();
	displayTITLE[0] = "路名:";
	displayTITLE[1] = "路段起點:";
	displayTITLE[2] = "路段終點:";
	displayTITLE[3] = "收費資訊:";
	totalSpace = INFO.GETrd_count();
	destination=INFO.GETrd_name();
}
%>

<%
String mapURL = "https://www.google.com/maps/dir/?api=1&"+
				"origin=Your+location&destination="+
				destination+
				"&travelmode=driving";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>停車資訊</title>
<style>
	body {
		background: #468CCF;
		font-family:Microsoft JhengHei;
		font-weight: bold;
		color:white;
	}
	input {
		width: 200px;
		height: 40px;
		border-radius: 10px;
		border: 2px #000000 solid;
		cursor: pointer;
		font-size: 20px;
		font-family: Microsoft JhengHei;
		font-weight: bold;
		text-align: center;
	}
	input[type="submit"] {
		width: 100px;
		border-radius: 20px;
		border: 3px #FFFF00 solid;
		cursor: pointer;
		background-color:#468CCF;
		font-size: 20px;
		font-family: Microsoft JhengHei;
		font-weight: bold;
		color: white;
		transition: 0.5s;
	}
	input[type="button"] {
		width: 100px;
		border-radius: 20px;
		border: 3px #FFFF00 solid;
		cursor: pointer;
		background-color:#468CCF;
		font-size: 20px;
		font-family: Microsoft JhengHei;
		font-weight: bold;
		color: white;
		transition: 0.5s;
	}
	input[type="submit"]:hover{
		transform: scale(0.8);
	}
	#table {
		margin:0px auto;
		text-align:center;
		width:640px;
		height:600px;
		line-height:40px;
		background: url(bg.png);
		background-position: bottom;
		overflow: hidden;
		border: 5px #FFFF00 solid;
		font-size:20px;
		font-family: Microsoft JhengHei;
		font-weight: bold;
		transition: 0.4s;
		display: block;
	}
}
</style>
</head>
<body>
<form method="post" action="main" name="FORM">
<div id="table">
	<p>
		<%out.print("您查詢的時間:");%>
		<%out.print(datetime);%>
	</p>
	<p>
		<%out.print("可用車位 / 總計車位:");%>
		<%if(nowSpace==-1)
			out.print("查無資料");
		  else{
			out.print(nowSpace);
			out.print(" / ");
			out.print(totalSpace);
		}%>
	</p>
	<p>
		<%out.print(displayTITLE[0]);%>
		<%out.print(displayINFO[0]);%>
	</p>
	<p>
		<%out.print(displayTITLE[1]);%>
		<%out.print(displayINFO[1]);%>
	</p>
	<p>
		<%out.print(displayTITLE[2]);%>
		<%out.print(displayINFO[2]);%>
	</p>
	<p style="font-size:15px;">
		<%out.print(displayTITLE[3]);%>
		<%out.print(displayINFO[3]);%>
	</p>
	<p><input type="submit" value="重新查詢" name="action"></p>
	<p><input type="button" value="MAP" name="action" onclick="location.href='<%out.print(mapURL);%>'"></p>
	
	<!--<p><button type="button" onclick="location.href='<%out.print(mapURL);%>'">
	<img src="/images.png"></button></p>-->
</div>
</form>
</body>
</html>