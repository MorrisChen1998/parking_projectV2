<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.*,java.util.*,javax.servlet.*,java.text.*,defult.*" %>
<%//handling about time issue.
	Date Now = new Date();
	SimpleDateFormat date = new SimpleDateFormat ("yyyy-MM-dd");
	SimpleDateFormat time = new SimpleDateFormat ("HH:mm");
	int timeInterval = 10*60;//10 minutes interval
	
	//we can predict today, tomorrow, and day after tomorrow
	long afterTime=(Now.getTime()/1000)+60*60*24*2;
	Date twoDayAfter = new Date();
	twoDayAfter.setTime(afterTime*1000); 
	
	int minutes = Now.getMinutes();
	int time10 = (minutes/10+1)*10;//ex:12->20, 48->50
	long timeShow=(Now.getTime()/1000)+60*(time10-minutes);
	Date timeAfter = new Date();
	timeAfter.setTime(timeShow*1000);
%>
<%//handling about database issue.
parkingInfoDBController DATABASE = new parkingInfoDBController();
ArrayList<roadsidesInfoBean> roadsidesData = DATABASE.GETroadsidesData();
ArrayList<parkinglotsInfoBean> parkinglotsData = DATABASE.GETparkinglotsData();
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
	input[type="submit"]:hover{
		transform: scale(0.8);
	}
	#table {
		margin:0px auto;
		text-align:center;
		width:640px;
		height:480px;
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
<script type="text/javascript">
	function Check()
	{
		if(document.FORM.PLACE.value=="")
		{
			window.alert("選擇地點不能空白");
			return false;
		}
		else return true;
	}
</script>
</head>
<body>
<form method="post" action="main" name="FORM">
	<div id="table">
		<p>選擇要停車的地點:</p>
			<p><input list="place" id="PLACE" name="PLACE" placeholder="選擇地點" >
			<datalist id="place">
				<option value="_________________________路邊停車  roadsides_________________________">
				<%for(int i = 0;i < roadsidesData.size();i++){
					out.print("<option value=\"");
					out.print(roadsidesData.get(i).GET_id());
					out.print(":");
					out.print(roadsidesData.get(i).GETrd_name());
					out.print("\")>");
				}%>
				<option value="_________________________停車場  parkinglots_________________________">
				<%for(int i = 0;i < parkinglotsData.size();i++){
					out.print("<option value=\"");
					out.print(parkinglotsData.get(i).GETparkId());
					out.print(":");
					out.print(parkinglotsData.get(i).GETparkName());
					out.print("\")>");
				}%>
			</datalist></p>
			<p>選擇要停車的日期:</p>
			<p><input type="date" id="DATE" name="DATE" 
					value=<%out.print(date.format(Now));%> 
					min=<%out.print(date.format(Now));%> 
					max=<%out.print(date.format(twoDayAfter));%>></p>
			<p>選擇要停車的時間:</p>
			<p><input type="time" id="TIME" name="TIME" 
					value=<%out.print(time.format(timeAfter));%> 
					step=<%out.print(timeInterval);%>></p>
		<p><input type="submit" value="查詢" name="action" onclick="return Check()"></p>
	</div>
</form>
</body>
</html>