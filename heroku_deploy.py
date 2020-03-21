import os
import shutil
import sys

# THIS BUILD FILE AUTOMATES building the front & back end of the app and deploying it to Heroku.

FILE_PATH = os.path.dirname(os.path.realpath(__file__))

def init_deploy():
    shutil.rmtree(os.path.join(FILE_PATH, 'deployment'))


def copy_backend():
    shutil.copytree(
        os.path.join(FILE_PATH, 'api-server'),
        os.path.join(FILE_PATH, 'deployment'),
        ignore=shutil.ignore_patterns('node_modules'))


def build_frontend():
    os.system('cd react-front-end && npm run build')


def copy_build_folder():
    shutil.copytree(
        os.path.join(FILE_PATH, 'react-front-end', 'build'),
        os.path.join(FILE_PATH, 'deployment', 'build'))
    shutil.rmtree(os.path.join(FILE_PATH, 'react-front-end', 'build'))


def push_to_heroku():
    os.system('git add .')
    os.system('git commit -m "Commit from heroku-deploy.py for deployment"')
    os.system('git push origin master')
    os.system('git subtree push --prefix deployment heroku master')


def main():
    init_deploy()
    copy_backend()
    build_frontend()
    copy_build_folder()
    push_to_heroku()


if __name__ == "__main__":
    main()