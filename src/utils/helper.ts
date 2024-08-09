import CryptoJS from 'crypto-js';
import Resizer from 'react-image-file-resizer';

export function toMobileNum(s: string) {
  const num = s.replaceAll('-', '');
  if (num.length > 7) {
    return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7)}`;
  } else if (3 < num.length && num.length < 8) {
    return `${num.slice(0, 3)}-${num.slice(3)}`;
  } else {
    return num;
  }
}

export function encryptData(plainText: string) {
  const cipherText = CryptoJS.AES.encrypt(
    plainText,
    process.env.REACT_APP_CRYPTO_KEY
  ).toString();
  return cipherText;
}

export function decryptData(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    process.env.REACT_APP_CRYPTO_KEY
  );
  const plainText = bytes.toString(CryptoJS.enc.Utf8);
  return plainText;
}

export function getCycle(cycle: string) {
  if (!cycle) {
    return '0일';
  }
  const type = cycle.slice(-1);
  const day = Number(cycle.slice(0, -1));
  const typeCount = type === 'd' ? '일' : type === 'w' ? '주' : '달';

  return `${day}${typeCount}`;
}

export function getMultiArrayData<T>(data: T[], count: number = 2): T[][] {
  const result: T[][] = [];
  let child: T[] = [];

  data.forEach((option, index) => {
    child.push(option);
    if (child.length > count - 1) {
      result.push(child);
      child = [];
    } else if (index === data.length - 1) {
      result.push(child);
    }
  });
  return result;
}

export function getOneLineText(text: string) {
  const splitText = text.split('<br>').join('');
  const nextSplit = splitText.split('<p>').join('');
  const result = nextSplit.split('</p>').join('');

  return result;
}

export function toObjWithExistValue<T>(obj: T) {
  let newObj = {} as Partial<T>;
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
}

export function toBodyStyleHidden(onOff: boolean) {
  const body = document.querySelector('body') as HTMLElement;

  if (onOff) {
    body.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.height = '100%';
  } else {
    body.removeAttribute('style');
  }
}

export function toPhoneNumber(phone: string) {
  const phoneArr =
    phone.length === 11
      ? [phone.slice(0, 3), phone.slice(3, 7), phone.slice(7)]
      : [phone.slice(0, 3), phone.slice(3, 6), phone.slice(6)];
  const result = phoneArr.join('-');

  return result;
}

export function toCommaString(
  list: { id: number | string; name: string }[],
  type: 'id' | 'name'
) {
  const commaString = list.reduce((acc, crr) => {
    if (!acc.length) {
      return `${crr[type]}`;
    }
    return `${acc},${crr[type]}`;
  }, '');

  return commaString;
}

export function getLastCardNum(cardNum: string) {
  const cardNumArr = cardNum.split('*');
  const lastCardNum = cardNumArr[cardNumArr.length - 1];

  return lastCardNum;
}

export function toHexColorCode(color: string) {
  switch (color) {
    case 'RED':
      return '#ec1918';
    case 'YELLOW':
      return '#f4d425';
    case 'GREEN':
      return '#35b402';
    case 'BLUE':
      return '#3330fd';
    case 'WHITE':
      return '#ffffff';
    case 'GREY':
      return '#8b8b8b';
    case 'PINK':
      return '#ffc4db';
    default:
      return '#fff';
  }
}

export function toEllipsisStr(str: string, num?: number) {
  const strLen = str.length;
  if (strLen > 3) {
    return `${str.slice(0, num ?? 3)}...`;
  } else {
    return str;
  }
}

//mobile check
export function checkMobile() {
  const isMobile =
    /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile) {
    const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

    if (varUA.indexOf('android') > -1) {
      //안드로이드
      return 'android';
    } else if (
      varUA.indexOf('iphone') > -1 ||
      varUA.indexOf('ipad') > -1 ||
      varUA.indexOf('ipod') > -1
    ) {
      //IOS
      return 'ios';
    } else {
      //아이폰, 안드로이드 외
      return 'other';
    }
  } else {
    return 'deskTop';
  }
}

export function tagToString(str: string) {
  const newStrList = str
    .split('<br>')
    .map((str) => str.replace('<p>', '').replace('</p>', '').replace('\n', ''));

  return newStrList.join(' ');
}

export function getExistData(list: any[], checkList: any[], isValue?: boolean) {
  let existList = [] as any[];
  checkList.forEach((checkItem) => {
    list.forEach((item) => {
      if (!isValue) {
        if (checkItem === item.id.toString()) {
          existList.push({ id: item.id, name: item.name });
        }
      } else {
        if (checkItem === item.value) {
          existList.push({ id: item.value, name: item.name });
        }
      }
    });
  });

  return existList;
}

export function getCircleNumber(num: number) {
  switch (num) {
    case 1:
      return '①';
    case 2:
      return '②';
    case 3:
      return '③';
    case 4:
      return '④';
    case 5:
      return '⑤';
    case 6:
      return '⑥';
    case 7:
      return '⑦';
    case 8:
      return '⑧';
    default:
      return '④';
  }
}

export function intComma(number: string | number = '0') {
  let newNum = '' as string | number;
  if (number) {
    if (`${Number(number)}` !== 'NaN') {
      newNum = Number(number);
    } else {
      newNum = 0;
    }
  } else {
    newNum = number;
  }

  return (newNum ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePassword(password: string) {
  // 1.0 password 제약 때문에 최소 8자리 이상으로 변경 - 로그인 시 사용
  const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return re.test(password);
}

export function validateStrongPassword(password: string) {
  // 2.0 조건에 맞춰 10자리로 변경 - 회원가입, 비밀번호 변경 등에 사용
  const re =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#\$%\^&\*\(\)\-_=\+<>\?])[A-Za-z\d~!@#\$%\^&\*\(\)\-_=\+<>\?]{10,}$/;
  return re.test(password);
}

export function validatePhoneNumber(phoneNumber: string) {
  const re = /^01([0|1|6|7|8|9])?[1-9]\d{7}$/;
  return re.test(phoneNumber);
}

export function validateDigit(digit: string) {
  const re = /^\d{6}$/;
  return re.test(digit);
}

export function validatePostcode(validatePostcode: string) {
  const re = /^\d{5}$/;
  return re.test(validatePostcode);
}

export function validator(
  this: Partial<{
    email: string;
    password: string;
    passwordMatch: string;
    phone: string;
    digit: string;
  }>,
  type: string,
  setIsValid: (bool: boolean) => void
) {
  switch (type) {
    case 'email':
      return this.email
        ? setIsValid(validateEmail(this.email))
        : setIsValid(true);
    case 'password':
      return this.password
        ? setIsValid(validatePassword(this.password))
        : setIsValid(true);
    case 'strongPassword':
      return this.password
        ? setIsValid(validateStrongPassword(this.password))
        : setIsValid(true);
    case 'passwordMatch':
      return this.passwordMatch
        ? setIsValid(this.password === this.passwordMatch)
        : setIsValid(true);
    case 'phone':
      return this.phone
        ? setIsValid(validatePhoneNumber(this.phone))
        : setIsValid(true);
    case 'digit':
      return this.digit
        ? setIsValid(validateDigit(this.digit))
        : setIsValid(true);
    default:
      return true;
  }
}

// 특수문자 체크
export function checkSpecial(str: string) {
  const regExp = /[~!@#$%^&*()_+|<>?:;{},.-]/gi;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}
// 한글 체크
export function checkKor(str: string) {
  const regExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

// 숫자 체크
export function checkNum(str: string) {
  const regExp = /^[0-9.]*$/;
  if (regExp.test(str.replaceAll(',', ''))) {
    return true;
  } else {
    return false;
  }
}

// 영문(영어) 체크
export function checkEng(str: string) {
  const regExp = /^[a-zA-Z]*$/; // 영어
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

// 영문+숫자만 입력 체크
export function checkEngNum(str: string) {
  const regExp = /^[a-zA-Z0-9]*$/;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

// 공백(스페이스 바) 체크
export function checkSpace(str: string) {
  if (str.search(/\s/) !== -1) {
    return true; // 스페이스가 있는 경우
  } else {
    return false; // 스페이스 없는 경우
  }
}

export function getDashPhone(str: string) {
  if (str) {
    return str
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  }
  return str ?? '';
}

export function getSellerRevenue(seller: number, supply: number) {
  const result = ((seller * 0.95 - supply) * 10) / 11;

  return Math.floor(result);
}

export function getNumberToKorean(num: number | string) {
  if (!num || isNaN(Number(num))) return '0';
  const strNum = num.toString();

  if (strNum.length > 4) {
    return `${intComma(strNum.slice(0, strNum.length - 4))}만`;
  } else {
    return intComma(num ?? 0);
  }
}

export function getHttpsUrl(url: string) {
  return url.includes('https://') || url.includes('http://')
    ? url
    : `https://${url}`;
}

type resizeOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  minWidth?: number;
  minHeight?: number;
};

export function getResizedImage(
  file: File | any,
  option?: resizeOptions
): Promise<any> {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      option?.maxWidth ?? 1000,
      option?.maxHeight ?? 1000,
      'JPEG',
      option?.quality ?? 100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
      option?.minWidth ?? 200,
      option?.minHeight ?? 200
    );
  });
}
