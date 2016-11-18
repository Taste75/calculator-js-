function calculator(str){
	let oprArr = ["+","-","*","/"];
	let relArr = [[">",">","<","<"],[">",">","<","<"],[">",">",">",">"],[">",">",">",">"]];
	let reg =/^(((\d*\.?\d+)|(\d+\.?\d*))(\+|\-|\*|\/){1})+((\d*\.?\d+)|(\d+\.?\d*))$/g;

	let numStr = "";
	let numStack = [];
	let oprStack = [];
	let temNumStack = [];
	let temOprStack = [];
	let result = 0;

	if(!reg.test(str)){
		alert("不是算式！请重新输入！");
	}else{
		for(let i of str){
			if($.inArray(i, oprArr) !== -1){
				numStack.push(parseFloat(numStr));
				numStr = "";
				oprStack.push(i);
			}else{
				numStr += i;
			}
		}
		numStack.push(parseFloat(numStr));
		numStack = numStack.reverse();
		oprStack = oprStack.reverse();
		console.log("num:"+numStack);
		console.log("opr:"+oprStack);

		let preOpr = oprStack.pop();
		let left = numStack.pop();
		let curOpr = oprStack[oprStack.length-1];
		let right = numStack[numStack.length-1];
		let i=0;
		while(preOpr){
			console.log(i+" preOpr:"+preOpr);
			console.log(i+" curOpr:"+curOpr);
			console.log(i+" left:"+left);
			console.log(i+" right:"+right);
			console.log(i+" numStack:"+numStack);
			console.log(i+" oprStack:"+oprStack);
			console.log(i+" temNumStack:"+temNumStack);
			console.log(i+" temOprStack:"+temOprStack);
			let flag = calculation(preOpr, curOpr, left, right);
			if(flag){
				if(temOprStack.length){
					preOpr = temOprStack.pop();
				}else{
					preOpr = oprStack.pop();
				}
				if(temNumStack.length){
					left = temNumStack.pop();
				}else{
					left = numStack.pop();
				}
			}else{
				preOpr = oprStack.pop();
				left = numStack.pop();
			};
			curOpr = oprStack[oprStack.length-1];
			right = numStack[numStack.length-1];

			i++;
		}

		function calculation(preOpr, curOpr, left, right){
			let flag;
			if(curOpr){
				flag = doTakePre(preOpr, curOpr);
			}else{
				flag = 1;
			}

			if(flag){
				switch(preOpr){
					case("+"):result = left + right;break;
					case("-"):result = left - right;break;
					case("*"):result = left * right;break;
					case("/"):result = left / right;break;
				};
				numStack.pop();
				numStack.push(result);
				console.log("result: "+result);
				return 1;
			}else{
				temNumStack.push(left);
				temOprStack.push(preOpr);
				return 0;
			}

		}


		function doTakePre(preOpr, curOpr){
			let i=0,j=0;

			switch(preOpr){
				case("+"):i=0;break;
				case("-"):i=1;break;
				case("*"):i=2;break;
				case("/"):i=3;break;
			};

			switch(curOpr){
				case("+"):j=0;break;
				case("-"):j=1;break;
				case("*"):j=2;break;
				case("/"):j=3;break;
			};

			if(relArr[i][j] === ">"){
				return 1;
			}else{
				return 0;
			}
		}

		return result;

	}
}
