package mci.main.system;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.xhtmlrenderer.pdf.ITextFontResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.lowagie.text.DocumentException;
import com.lowagie.text.pdf.BaseFont;



public class CreatePDF {
public static void main(String[] args) throws DocumentException, IOException {
	 String outputFile = "D:/test.pdf";  
     OutputStream os = new FileOutputStream(outputFile);  
     ITextRenderer renderer = new ITextRenderer();  
     ITextFontResolver fontResolver = renderer.getFontResolver();  
     fontResolver.addFont("C:/Windows/fonts/simsun.ttc",  
             BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);  
     StringBuffer html = new StringBuffer();  
     // DOCTYPE 必需写否则类似于 这样的字符解析会出现错误  
     html.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");  
     html.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");  
     html.append("<html xmlns=\"http://www.w3.org/1999/xhtml\">")  
             .append("<head>")  
             .append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />")  
             .append("<style type=\"text/css\" mce_bogus=\"1\">body {font-family: SimSun;}</style>")  
             .append("</head>")  
             .append("<body><strong><span style=\"font-size: 20pt; \">欢迎使用</span></strong>");  
     html.append("<div>支持中文！</div>");  
     html.append("</body></html>");  
     System.out.println(html.toString());  
     renderer.setDocumentFromString(html.toString());  
     // 解决图片的相对路径问题  
     // renderer.getSharedContext().setBaseURL("file:/F:/teste/html/");  
     renderer.layout();  
     renderer.createPDF(os);  
     os.close();  
}
}