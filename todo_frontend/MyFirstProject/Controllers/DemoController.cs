using MyFirstProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyFirstProject.Controllers
{
    public class DemoController : Controller
    {
        // GET: Demo
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Index2()
        {
            return View();
        }
        public ActionResult Index3()
        {
            return View();
        }
        public ActionResult ToDoMain()
        {
            return View();
        }
        public ActionResult Index5()
        {
            return View();
        }

        private static List<StudentModel> lstStudentModel = new List<StudentModel>
        {
            new StudentModel { roll = 1, name = "Raj", age = 22 },
            new StudentModel { roll = 2, name = "Anjali", age = 21 },
            new StudentModel { roll = 3, name = "Thakur", age = 47 },
            new StudentModel { roll = 4, name = "Gabbar", age = 53 }
        };

        [HttpPost]
        public ActionResult GetStudentList()
        {
            return Json(lstStudentModel);
        }

        [HttpPost]

        public ActionResult SaveStudent(StudentModel studentData)
        {
            lstStudentModel.Add(studentData);
            return Json(lstStudentModel);
        }

        [HttpPost]
        public ActionResult UpdateStudent(StudentModel updatedStudent)
        {
            var existingStudent = lstStudentModel.Find(s => s.roll == updatedStudent.roll);

            if (existingStudent != null)
            {
                // Update the existing student with the new data
                existingStudent.name = updatedStudent.name;
                existingStudent.age = updatedStudent.age;
            }

            return Json(lstStudentModel);
        }

        [HttpPost]
        public ActionResult DeleteStudent(int roll)
        {
            var existingStudent = lstStudentModel.Find(s => s.roll == roll);

            if (existingStudent != null)
            {
                // Remove the student from the list
                lstStudentModel.Remove(existingStudent);
            }

            return Json(lstStudentModel);
        }

        public ActionResult SignUp()
        {
            return View();
        }

        public ActionResult SignIn()
        {
            return View();
        }

    }
}