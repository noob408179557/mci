package mci.base.interceptor;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


/**
 * 
 * ClassName: SessionInterceptor
 * 
 * @Description: Session拦截器
 * @author peter
 * @date 2015-12-25
 */
public class SessionInterceptor implements HandlerInterceptor,Serializable {

	private static final long serialVersionUID = 1L;

	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object obj, Exception e)
			throws Exception {

	}

	public void postHandle(HttpServletRequest arg0,
			HttpServletResponse response, Object obj, ModelAndView model)
			throws Exception {

	}

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object obj) throws Exception {
		request.setCharacterEncoding("UTF-8");  
	    response.setCharacterEncoding("UTF-8");  
	    response.setContentType("text/html;charset=UTF-8"); 
		String requestUri = request.getRequestURI();
		if (requestUri.indexOf("user_login.do")!=-1) {
			return true;
		}
//		User user = (User) request.getSession().getAttribute("user");
//		if (user == null) {
//			 // 未登录   
//            PrintWriter out = response.getWriter();  
//            StringBuilder builder = new StringBuilder();  
//            builder.append("<script type=\"text/javascript\" charset=\"UTF-8\">");  
//            builder.append(" window.location.href=\"login.html\";");  
//            builder.append("</script>");  
//            out.print(builder.toString());  
//            out.close();  
//            return false;  
//		}
		return true;
	}

}
