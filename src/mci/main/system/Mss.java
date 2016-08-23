package mci.main.system;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Mss {
	  public Mss() {
		  
	  } 

	  public long fromDateStringToLong(String inVal) { //此方法计算时间毫秒
	  Date date = null;   //定义时间类型       
	  SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-mm-dd"); 
	  try {
	  date = inputFormat.parse(inVal); //将字符型转换成日期型
	  } catch (Exception e){
	  e.printStackTrace(); 
	  } 
	  return date.getTime();   //返回毫秒数
	  } 

	  public static  String dqsj() {//此方法用于获得当前系统时间（格式类型2007-11-6 15:10:58）
	   Date date = new Date();  //实例化日期类型
	   String today = date.toLocaleString(); //获取当前时间
//	   System.out.println("获得当前系统时间 "+today);  //显示
	   return today;  //返回当前时间
	  }
}
