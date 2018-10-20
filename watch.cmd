@echo off

where ConEmuC 

rem If ConEmu is not installed run with start
if %ERRORLEVEL% neq 0 (
  start yarn run watch
  cd public 
  start php -S localhost:5050
  cd ..
)

rem Else use ConEmu
if %ERRORLEVEL% equ 0 (
  ConEmuC /ATTACH /NOCMD /C "yarn run watch" -new_console:b
  cd public 
  ConEmuC /ATTACH /NOCMD /C "php -S localhost:5050"  -new_console:b
  cd ..
)

start chrome "http://localhost:5050"