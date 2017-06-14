

import jwt
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend

def main():
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik4wTTFORE5ET1VRME9VWkVNemhGUkRBd05qUTRORU5FTUVZMlJEWXdRVVZCTURCRE1UVXlRUSJ9.eyJpc3MiOiJodHRwczovL3ZvdGluZy10b3JuYWRvLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1OTM3YzRhMjc4ZWE5OTJhMWYxYjkxNmYiLCJhdWQiOiJsTTd1NDZGOXZHSXh4b0VSQjU3ZzJ4NWw0V0VRcllPZCIsImV4cCI6MTQ5NzQ3MTE4NCwiaWF0IjoxNDk3NDM1MTg0LCJub25jZSI6InlBMlJyLkxrRTJYOExYdGVpSEFZWmE0ZW5CZWFGRmJ3IiwiYXRfaGFzaCI6IlBaa0xqb2tLRldJLTkwOHpKTVJKVEEiLCJodHRwOi8vdm90aW5nLXRvcm5hZG8uY29tL3JvbGVzIjpbIkFkbWluIl0sImh0dHA6Ly92b3RpbmctdG9ybmFkby5jb20vZ3JvdXBzIjpbIlN0YXIgVHJlayIsIlN0YXIgV2FycyIsIkJhdHRsZXN0YXIgR2FsYWN0aWNhIiwiQmFieWxvbiA1IiwiRmlyZWZseSJdfQ.e3SVCa2VqqYkznTJdRSVoH8ovEDLUoz9ENohgHHeEnXOPIacByoYXBTfSIK5SzsqfKXDzgW1Rej3mRD85qPlo3CaD0C-xK9GKfU45RLhFy1MNdgdJwebbnsxoaJrBzth5WdQ2Z1wL4y8D3t7QyHtXzLOJ7lk1Q0CK0leJ8jna3IhycAIjEhv-CS7LlAY9wbmzMABpjdlsqI_uHREmmFVWoilPwTgqo0tnwMNKpEfqW0WXSw3G8DroCjPKa6ybjXcyiT8CROhnxfQzuJSkZ1rLFcpNo6t-gyKdDzio-2MrN0ee5mlCPfniQGwDcIaaQrCYHHO1ckFiWPQprXNENdXqg'
    key = ''
    with open('voting-tornado.pem', 'r') as f:
        key = ''.join(f.readlines()).encode()

    cert = load_pem_x509_certificate(key, default_backend())
    decoded = jwt.decode(token, cert.public_key(), algorithm=['RS256'], audience='lM7u46F9vGIxxoERB57g2x5l4WEQrYOd')
    print(decoded)

if __name__ == "__main__":
    main()