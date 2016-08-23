package mci.main.system;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.io.InputStream;  
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.ServletException;  
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
@WebServlet(asyncSupported = true, urlPatterns = { "/ServletDownload" })  
public class Download2 extends HttpServlet {  
    /**
	 * 
	 */
	private static final long serialVersionUID = -5106980258517225832L;

	public HttpServletResponse download(String path, HttpServletResponse response) {
    	try {
    	// path是指欲下载的文件的路径。
    	File file = new File(path);
    	// 取得文件名。
    	String filename = file.getName();
    	// 取得文件的后缀名。
    	String ext = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();
    	// 以流的形式下载文件。
    	InputStream fis = new BufferedInputStream(new FileInputStream(path));
    	byte[] buffer = new byte[fis.available()];
    	fis.read(buffer);
    	fis.close();
    	// 清空response
    	response.reset();
    	// 设置response的Header
    	response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()));
    	response.addHeader("Content-Length", "" + file.length());
    	OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
    	response.setContentType("application/octet-stream");
    	toClient.write(buffer);
    	toClient.flush();
    	toClient.close();
    	} catch (IOException ex) {
    	ex.printStackTrace();
    	}
    	return response;
    	}
}  