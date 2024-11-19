from rest_framework.test import APITestCase
from rest_framework import status
from .models import Project, User, Post

class ProjectViewsetTest(APITestCase):

    def setUp(self):
        self.project = Project.objects.create(
            name="Test Project",
            start_date="2023-01-01",
            end_date="2023-12-31",
            comments="This is a test project.",
            status="Active",
        )
        self.project_url = "/project/"  

    def test_list_projects(self):
        """Test listing all projects"""
        response = self.client.get(self.project_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        """Test creating a new project"""
        data = {
            "name": "New Project",
            "start_date": "2024-01-01",
            "end_date": "2024-12-31",
            "comments": "A new test project",
            "status": "Pending",
        }
        response = self.client.post(self.project_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)

    def test_retrieve_project(self):
        """Test retrieving a specific project"""
        response = self.client.get(f"{self.project_url}{self.project.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.project.name)

    def test_update_project(self):
        """Test updating a project"""
        data = {
            "name": "Updated Project",
            "start_date": "2023-01-01",
            "end_date": "2023-12-31",
            "comments": "Updated comments",
            "status": "Completed",
        }
        response = self.client.put(f"{self.project_url}{self.project.id}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertEqual(self.project.name, "Updated Project")

    def test_delete_project(self):
        """Test deleting a project"""
        response = self.client.delete(f"{self.project_url}{self.project.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Project.objects.count(), 0)


class UserViewsetTest(APITestCase):

    def setUp(self):
        User.objects.all().delete()
        self.user = User.objects.create(
            userEmail="test@example.com",
            userName="TestUser",
            screenName="UniqeName",
        )
        self.user_url = "/user/"   

    def test_list_users(self):
        """Test listing all users"""
        response = self.client.get(self.user_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        """Test creating a new user"""
        data = {
            "userEmail": "newuser@example.com",
            "userName": "NewUser",
            "userPassword": "password123",
        }
        response = self.client.post(self.user_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_retrieve_user(self):
        """Test retrieving a specific user"""
        response = self.client.get(f"{self.user_url}{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["userEmail"], self.user.userEmail)


class PostViewsetTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create(userEmail="test@example.com", userName="TestUser")
        self.post = Post.objects.create(
            user=self.user,
            userName="TestUser",
            postDescription="A test post",
            postContent="Test content",
        )
        self.post_url = "/post/" 

    def test_list_posts(self):
        """Test listing all posts"""
        response = self.client.get(self.post_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):
        """Test creating a new post"""
        data = {
            "userName": "NewUser",
            "postDescription": "A new post description",
            "postContent": "New content",
        }
        response = self.client.post(self.post_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)

    def test_retrieve_post(self):
        """Test retrieving a specific post"""
        response = self.client.get(f"{self.post_url}{self.post.postID}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["postDescription"], self.post.postDescription)
