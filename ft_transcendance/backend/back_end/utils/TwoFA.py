import pyotp, time, qrcode
from datetime import datetime, timedelta
from django.http import JsonResponse

def TFA(request):
    key = pyotp.random_base32()
    otp = pyotp.TOTP(key)
    print("_________________")
    print(otp.now())
    print("_________________")
    resp = {'key': key}
    return JsonResponse(resp)
    return 


# totp = pyotp.TOTP(pyotp.random_base32(), interval = 60)
# otp = totp.now()
# print(totp.secret)
# # request.session['otp_secret_key'] = totp.secret()
# valid_date = datetime.now() + timedelta(minutes=1)
# # request.session['otp_valide_data'] = str(valid_date)

# input_code = input('ENTER CODE :  ')


# uri = pyotp.totp.TOTP(key).provisioning_uri(name="fadermou", issuer_name=key)
# qrcode.make(uri).save("totp.png")
# input_code = input("ENTER CODE    ")

# # Verify the input code
# if input_code:
#     if otp.verify(input_code):
#         print("Code is valid!")
#     else:
#         print("Invalid code!")
# # resp = {'key': key}
