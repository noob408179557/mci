function veryfyEmail(temp) {
	// 对电子邮件的验证
	var myreg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
	if (!myreg.test(temp)) {
		swal('Please enter an available  Email!');
		return false;
	}
	return true;
}